<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <PageContent>
      <div
        class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 class="break-words text-xl font-bold">{{ title }}</h1>
          <p class="break-words text-dialog">ID: {{ id }}</p>
        </div>
        <div
          v-if="logoUrl"
          class="h-10 w-16 bg-contain bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${logoUrl})` }"
        ></div>
      </div>
      <div
        v-if="
          odhActivityPoiConfig.views?.quick?.topGallery?.isVisible &&
          imageGallery.length <= 1 &&
          mainImage
        "
        class="relative mt-5"
      >
        <img
          :src="mainImage.url"
          :alt="mainImage.desc as string || ''"
          class="w-full"
          @error="onMainImageError"
        />
        <TagCustom
          v-if="!hasImage"
          size="md"
          type="white"
          :text="t('datasets.quickView.standardImageWarning')"
          has-dot
          class="absolute top-4 right-4"
        />
      </div>
    </PageContent>

    <QuickViewFullscreenGallery
      v-if="
        odhActivityPoiConfig.views?.quick?.topGallery?.isVisible &&
        imageGallery.length > 1
      "
      :images="imageGallery"
    />

    <PageContent>
      <div
        v-for="(element, index) in mappedElements"
        :key="index"
        class="mt-3 max-lg:!w-auto lg:mt-6 lg:odd:float-left lg:even:float-right lg:even:ml-8"
        :style="{
          width: 'calc(50% - 1rem)',
        }"
      >
        <ComponentRenderer
          :tag-name="element.component"
          :attributes="element.value"
          :fields="element.fields"
          :list-fields="element.listFields"
        />
      </div>
      <div class="clear-both mb-4" />
    </PageContent>
  </template>
</template>

<script lang="ts" setup>
import LoadingError from '../../../components/loading/LoadingError.vue';

import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApiReadForCurrentDataset } from '../../api';

import { odhActivityPoiConfig } from '../../../config/tourism/odhActivityPoi/odhActivityPoi.config';

import PageContent from '../../../components/content/PageContent.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import QuickViewFullscreenGallery from '../../../components/quickview/QuickViewFullscreenGallery.vue';

import { getValueOfLocale } from '../../../components/quickview/QuickViewUtils';

import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import { usePropertyComputation } from '../category/usePropertyComputation';
import { PropertyConfig } from '../../datasetConfig/types';

interface GalleryImage {
  ImageUrl: string;
  ImageDesc: Record<string, unknown>;
}

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset();

const forcePlaceholderImage = ref(false);

const { t, locale } = useI18n();
const currentLocale = locale.value;

const { computeProperties } = usePropertyComputation();

const mappedElements = computed(() => {
  return computeProperties(
    data.value as Record<string, unknown>,
    (odhActivityPoiConfig.views?.quick?.elements as PropertyConfig[]) ?? [],
    true,
    false
  );
});

const title = computed(() => {
  return (
    (
      getValueOfLocale(
        currentLocale,
        (data.value as Record<string, unknown>).Detail as Record<
          string,
          unknown
        >
      ) as Record<string, unknown>
    )?.Title || '/'
  );
});

const id = computed(() => {
  return (data.value as Record<string, unknown>).Id;
});

const hasImage = computed(() => {
  return (
    imageGallery.value?.length > 0 &&
    imageGallery.value?.[0].ImageUrl?.length > 0
  );
});

const mainImage = computed(() => {
  if (!imageGallery.value) {
    return null;
  }

  const firstImage = imageGallery.value?.[0];

  return firstImage?.ImageUrl && !forcePlaceholderImage.value
    ? {
        url: firstImage.ImageUrl,
        desc: getValueOfLocale(currentLocale, firstImage.ImageDesc),
      }
    : null;
});

const imageGallery = computed(() => {
  return ((data.value as Record<string, unknown>)[
    odhActivityPoiConfig.views?.quick?.topGallery?.fields.gallery as string
  ] || []) as GalleryImage[];
});

const logoUrl = computed(() => {
  return (
    getValueOfLocale(
      currentLocale,
      (data.value as Record<string, unknown>).ContactInfos as Record<
        string,
        unknown
      >
    ) as Record<string, unknown>
  )?.LogoUrl;
});

const onMainImageError = () => {
  forcePlaceholderImage.value = true;
};
</script>
