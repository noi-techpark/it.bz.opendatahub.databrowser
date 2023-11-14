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
        v-if="topGallery?.isVisible && imageGallery.length <= 1 && mainImage"
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
      v-if="topGallery?.isVisible && imageGallery.length > 1"
      :images="imageGallery"
    />

    <PageContent>
      <div
        v-for="(element, index) in elements"
        :key="index"
        class="mt-3 max-lg:!w-auto lg:mt-6 lg:odd:float-left lg:even:float-right lg:even:ml-8"
        :style="{
          width: 'calc(50% - 1rem)',
        }"
      >
        <ComponentRenderer
          :tag-name="element.component"
          :attributes="
            buildTargetFromObjectMapping(
              data,
              element.objectMapping,
              element.params
            )
          "
          :object-mapping="element.objectMapping"
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
import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import PageContent from '../../../components/content/PageContent.vue';
import QuickViewFullscreenGallery from '../../../components/quickview/QuickViewFullscreenGallery.vue';
import { getValueOfLocale } from '../../../components/quickview/QuickViewUtils';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { buildTargetFromObjectMapping } from '../../api';
import { QuickViewConfig } from '../../datasetConfig/types';
import { useSingleRecordLoad } from '../common/load/useSingleRecordLoad';
import { rowId } from '../tableView/utils';

interface GalleryImage {
  ImageUrl: string;
  ImageDesc: Record<string, unknown>;
}

const { isError, data, error, view, extractValueByPath } =
  useSingleRecordLoad();
const topGallery = computed(
  () => (view.value as QuickViewConfig | undefined)?.topGallery
);
const elements = computed(
  () => (view.value as QuickViewConfig | undefined)?.elements
);

const forcePlaceholderImage = ref(false);

const { t, locale } = useI18n();
const currentLocale = locale.value;

const title = computed(
  () => extractValueByPath.value(data.value, 'Detail.{language}.Title') ?? '/'
);

const id = computed(() => {
  return rowId(data.value as Record<string, unknown>);
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
  const gallery = extractValueByPath.value(
    data.value,
    topGallery.value?.objectMapping.gallery as string
  );
  return (gallery ?? []) as GalleryImage[];
});

const logoUrl = computed(() =>
  extractValueByPath.value(data.value, 'ContactInfos.{language}.LogoUrl')
);

const onMainImageError = () => {
  forcePlaceholderImage.value = true;
};
</script>
