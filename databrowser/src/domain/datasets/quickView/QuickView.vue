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
          odhActivityPoiConfig.views?.quick?.topGallery.isVisible &&
          imageGallery.length <= 1 &&
          mainImage
        "
        class="relative mt-5"
      >
        <img
          :src="mainImage.url"
          :alt="mainImage.desc"
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
        odhActivityPoiConfig.views?.quick?.topGallery.isVisible &&
        imageGallery.length > 1
      "
      :images="imageGallery"
    />

    <PageContent>
      <div class="grid-ct">
        <div
          v-for="(element, index) in odhActivityPoiConfig.views?.quick
            ?.elements"
          :key="index"
          class="element-ct"
        >
          <ComponentRenderer
            :tag-name="element.component"
            :attributes="mapWithIndex(data, element.fields, element.params)"
            :fields="element.fields"
          />
        </div>
      </div>
      <div class="clear" />
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
import { usePropertyMapping } from '../../api';

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset();

const forcePlaceholderImage = ref(false);

const { t, locale } = useI18n();
const currentLocale = locale.value;

const { mapWithIndex } = usePropertyMapping();

const title = computed(() => {
  return getValueOfLocale(currentLocale, data.value.Detail)?.Title || '/';
});

const id = computed(() => {
  return data.value.Id;
});

const hasImage = computed(() => {
  return imageGallery.value?.ImageUrl?.length > 0;
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
    : {
        url: 'https://via.placeholder.com/700x350?text=Missing+image', // NOTE: this is a demo image to preview the gallery functionality on datasets without a gallery. It should be removed for the final release.
        desc: 'Placeholder image',
      };
});

const imageGallery = computed(() => {
  return (
    data.value[odhActivityPoiConfig.views?.quick?.topGallery?.fields.gallery] ||
    []
  );
});

const logoUrl = computed(() => {
  return getValueOfLocale(currentLocale, data.value.ContactInfos)?.LogoUrl;
});

const onMainImageError = () => {
  forcePlaceholderImage.value = true;
};
</script>

<style scoped>
.clear {
  @apply mb-4 clear-both;
}

.grid-ct .element-ct {
  @apply mt-6;

  width: calc(50% - 15px);
}

.grid-ct .element-ct:nth-child(odd) {
  @apply float-left;
}

.grid-ct .element-ct:nth-child(even) {
  @apply float-right;

  margin-left: 30px;
}

@media screen and (max-width: 980px) {
  .grid-ct .element-ct {
    @apply w-auto;

    float: none !important;
  }

  .grid-ct .element-ct:nth-child(even) {
    @apply ml-0;
  }
}
</style>
