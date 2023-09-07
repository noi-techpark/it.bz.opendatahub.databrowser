<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-else>
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
          quickView?.topGallery?.isVisible &&
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
          class="absolute right-4 top-4"
        />
      </div>
    </PageContent>

    <QuickViewFullscreenGallery
      v-if="quickView?.topGallery?.isVisible && imageGallery.length > 1"
      :images="imageGallery"
    />

    <PageContent>
      <div
        v-for="(element, index) in quickView?.elements"
        :key="index"
        class="mt-3 max-lg:!w-auto lg:mt-6 lg:odd:float-left lg:even:float-right lg:even:ml-8"
        :style="{
          width: 'calc(50% - 1rem)',
        }"
      >
        <ComponentRenderer
          :tag-name="element.component"
          :attributes="mapWithIndex(data, element.fields, element.params)"
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

import PageContent from '../../../components/content/PageContent.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import QuickViewFullscreenGallery from '../../../components/quickview/QuickViewFullscreenGallery.vue';

import { getValueOfLocale } from '../../../components/quickview/QuickViewUtils';

import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import { useSingleDatasetLoad } from '../common/load/useSingleDatasetLoad';
import { usePropertyMapping } from '../../api';

interface GalleryImage {
  ImageUrl: string;
  ImageDesc: Record<string, unknown>;
}

const { isError, data, error, quickView, getDataForField } =
  useSingleDatasetLoad<Record<string, unknown>>();

const { mapWithIndex } = usePropertyMapping();

const forcePlaceholderImage = ref(false);

const { t, locale } = useI18n();
const currentLocale = locale.value;

const title = computed(
  () => getDataForField.value(data.value, 'Detail.{language}.Title') ?? '/'
);

const id = computed(() => {
  return data.value?.Id;
});

const hasImage = computed(() => {
  return (
    imageGallery.value?.length > 0 &&
    imageGallery.value?.[0].ImageUrl?.length > 0
  );
});

const mainImage = computed(() => {
  if (imageGallery.value == null) {
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
  const gallery = getDataForField.value(
    data.value,
    quickView.value?.topGallery?.fields.gallery as string
  );
  return (gallery ?? []) as GalleryImage[];
});

const logoUrl = computed(() =>
  getDataForField.value(data.value, 'ContactInfos.{language}.LogoUrl')
);

const onMainImageError = () => {
  forcePlaceholderImage.value = true;
};
</script>
