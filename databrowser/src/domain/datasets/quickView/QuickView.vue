<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <PageContent>
      <div class="">
        <h1 class="text-xl font-bold">{{ title }}</h1>
        <p class="text-dialog">ID:{{ id }}</p>
        <div class="relative mt-5">
          <img :src="mainImage.url" :alt="mainImage.desc" class="w-full" />
          <TagCustom
            size="md"
            type="white"
            :text="t('datasets.quickView.standardImageWarning')"
            has-dot
            class="absolute top-4 right-4"
          />
        </div>
        <div class="gap-8 mt-8 md:grid md:grid-cols-2">
          <QuickViewCardOverview title="Contact" :sections="contactSections" />
          <div>
            <QuickViewCardOverview
              title="Record information"
              :sections="recordInformationSections"
            />
          </div>
        </div>
      </div>
    </PageContent>
  </template>
</template>

<script lang="ts" setup>
import LoadingError from '../../../components/loading/LoadingError.vue';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApiReadForCurrentDataset } from '../../api';

import PageContent from '../../../components/content/PageContent.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import QuickViewCardOverview from '../../../components/quickview/QuickViewCardOverview.vue';

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset({
  skipAuth: true,
});

const { t, locale } = useI18n();
const currentLocale = locale.value;

const title = computed(() => {
  return getValueOfLocale(data.value.Detail)?.Title || '/';
});

const id = computed(() => {
  return data.value.Id;
});

const mainImage = computed(() => {
  const firstImage = data.value.ImageGallery?.[0];

  return firstImage?.ImageUrl
    ? {
        url: firstImage.ImageUrl,
        desc: getValueOfLocale(firstImage.ImageDesc),
      }
    : {
        url: 'https://via.placeholder.com/700', // FIXME
        desc: '',
      };
});

const contactSections = computed(() => {
  const details = getValueOfLocale(data.value.ContactInfos);
  return [
    {
      icon: 'IconDocument',
      content: [
        {
          title: 'Name/Company Name',
          text: getTextValue(details?.CompanyName),
        },
        {
          title: 'First name',
          text: getTextValue(details?.Givenname),
        },
        {
          title: 'Surnname',
          text: getTextValue(details?.Surname),
        },
      ],
    },
    {
      icon: 'IconBuilding',
      content: [
        {
          title: 'Street & Hausnumber',
          text: getTextValue(details?.Address),
        },
        {
          title: 'City',
          text: getTextValue(details?.City),
        },
        {
          title: 'ZIP-CODE',
          text: getTextValue(details?.ZipCode),
        },
        {
          title: 'Country',
          text: getTextValue(details?.CountryName),
        },
      ],
    },
    {
      icon: 'IconPhonebook',
      content: [
        {
          title: 'E-Mail',
          text: getTextValue(details?.Email),
        },
        {
          title: 'Phone Number',
          text: getTextValue(details?.Phonenumber),
        },
        {
          title: 'Web-URL',
          text: getTextValue(details?.Url),
        },
      ],
    },
  ];
});

const recordInformationSections = computed(() => {
  const lastUpdateDate = new Date(data.value._Meta.LastUpdate).toISOString();
  const [year, month, day] = lastUpdateDate.split('T')[0].split('-');
  return [
    {
      icon: 'IconEditFilled',
      content: [
        {
          title: 'Last Changed',
          text: `${day}.${month}.${year}`,
        },
      ],
    },
    {
      icon: 'IconServer',
      content: [
        {
          title: 'Active on source',
          text: `TODO`,
        },
        {
          title: 'Active on ODH',
          text: `TODO`,
        },
      ],
    },
  ];
});

const getTextValue = (value) => {
  return value ?? '/';
};

const getValueOfLocale = (obj) => {
  const fallbackLocale = 'en';

  return obj?.[currentLocale] || obj?.[fallbackLocale];
};
</script>
