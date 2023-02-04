<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <PageContent>
      <div
        class="flex flex-col gap-3 md:flex-row md:justify-between md:items-center"
      >
        <div>
          <h1 class="text-xl font-bold break-words">{{ title }}</h1>
          <p class="text-dialog break-words">ID: {{ id }}</p>
        </div>
        <div
          v-if="logoUrl"
          class="w-16 h-10 bg-center bg-no-repeat bg-contain"
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
        <!--<div
          v-for="(element, index) in odhActivityPoiConfig.views?.quick
            ?.elements"
          :key="index"
        >
          <ComponentRenderer
            :tag-name="element.component"
            :fields="element.fields"
          />
        </div>-->
        <div
          v-for="(element, index) in odhActivityPoiConfig.views?.quick
            ?.elements"
          :key="index"
          class="element-ct"
        >
          <QuickViewTextInfoCard
            v-if="element.component === QuickViewSectionComponent.INFO"
            :header="getValueOfLocale(currentLocale, data.Detail).Header"
            :sub-header="getValueOfLocale(currentLocale, data.Detail).SubHeader"
            :intro-text="getValueOfLocale(currentLocale, data.Detail).IntroText"
          />
          <QuickViewContactsCard
            v-else-if="element.component === QuickViewSectionComponent.CONTACTS"
            :company-name="
              getValueOfLocale(currentLocale, data.ContactInfos).CompanyName
            "
            :given-name="
              getValueOfLocale(currentLocale, data.ContactInfos).Givenname
            "
            :surname="
              getValueOfLocale(currentLocale, data.ContactInfos).Surname
            "
            :address="
              getValueOfLocale(currentLocale, data.ContactInfos).Address
            "
            :city="getValueOfLocale(currentLocale, data.ContactInfos).City"
            :zip-code="
              getValueOfLocale(currentLocale, data.ContactInfos).ZipCode
            "
            :country-name="
              getValueOfLocale(currentLocale, data.ContactInfos).CountryName
            "
            :email="getValueOfLocale(currentLocale, data.ContactInfos).Email"
            :phone-number="
              getValueOfLocale(currentLocale, data.ContactInfos).Phonenumber
            "
            :url="getValueOfLocale(currentLocale, data.ContactInfos).Url"
          />
          <QuickViewWebcamsView
            v-else-if="element.component === QuickViewSectionComponent.WEBCAMS"
            :webcams-media-items="data.Webcam"
          />
          <QuickViewMapView
            v-else-if="element.component === QuickViewSectionComponent.MAP"
            :gps-info="data.GpsInfo"
          />
          <QuickViewOpeningHoursView
            v-else-if="
              element.component === QuickViewSectionComponent.OPENING_HORUS
            "
            :schedule-data="data.OperationSchedule"
          />
          <QuickViewRecordInfoView
            v-else-if="
              element.component === QuickViewSectionComponent.RECORD_INFO
            "
            :last-update="data._Meta?.LastUpdate"
            :active="data.Active"
            :odh-active="data.OdhActive"
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

import { odhActivityPoiConfig } from '../../../config/tourism/odhActivityPoi/odhActivityPoi.config'; // TODO: check if it's the right way to import the file
import { QuickViewSectionComponent } from '../../../domain/datasetConfig/types';

import PageContent from '../../../components/content/PageContent.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import QuickViewFullscreenGallery from '../../../components/quickview/QuickViewFullscreenGallery.vue';

import { getValueOfLocale } from '../../../components/quickview/QuickViewUtils';

import QuickViewTextInfoCard from '../../../components/quickview/QuickViewTextInfoCard.vue';
import QuickViewContactsCard from '../../../components/quickview/QuickViewContactsCard.vue';
import QuickViewWebcamsView from '../../../components/quickview/QuickViewWebcamsView.vue';
import QuickViewMapView from '../../../components/quickview/QuickViewMapView.vue';
import QuickViewOpeningHoursView from '../../../components/quickview/QuickViewOpeningHoursView.vue';
import QuickViewRecordInfoView from '../../../components/quickview/QuickViewRecordInfoView.vue';

// import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset();

let forcePlaceholderImage = ref(false);

const { t, locale } = useI18n();
const currentLocale = locale.value;

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
        url: 'https://via.placeholder.com/700x350?text=Missing+image',
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
