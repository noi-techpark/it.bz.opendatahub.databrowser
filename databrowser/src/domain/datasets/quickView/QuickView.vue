<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <PageContent>
      <div class="">
        <h1 class="text-xl font-bold break-words">{{ title }}</h1>
        <p class="text-dialog break-words">ID:{{ id }}</p>
        <div class="relative mt-5">
          <img :src="mainImage.url" :alt="mainImage.desc" class="w-full" />
          <TagCustom
            v-if="!hasImage"
            size="md"
            type="white"
            :text="t('datasets.quickView.standardImageWarning')"
            has-dot
            class="absolute top-4 right-4"
          />
        </div>
        <div class="grid gap-8 mt-8 md:grid-cols-2">
          <div>
            <QuickViewCardOverview
              :title="t('datasets.quickView.contact')"
              :sections="contactSections"
            />
          </div>
          <div class="flex flex-col gap-8">
            <QuickViewCardOverview
              :title="t('datasets.quickView.locationOnMap')"
              cta-icon="IconExpand"
              :content-has-no-padding="true"
              @cta-click="openMapFullscreen()"
            >
              <template #content>
                <MapBase
                  ref="mapComponent"
                  :center="map.center"
                  :markers="map.markers"
                />
              </template>
            </QuickViewCardOverview>
            <QuickViewCardOverview
              :title="t('datasets.quickView.recordInformation')"
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

import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApiReadForCurrentDataset } from '../../api';

import PageContent from '../../../components/content/PageContent.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import MapBase from '../../../components/map/MapBase.vue';
import QuickViewCardOverview from '../../../components/quickview/QuickViewCardOverview.vue';

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset();

const mapComponent = ref(null);

const { t, locale } = useI18n();
const currentLocale = locale.value;

const title = computed(() => {
  return getValueOfLocale(data.value.Detail)?.Title || '/';
});

const id = computed(() => {
  return data.value.Id;
});

const hasImage = computed(() => {
  return data.value.ImageGallery?.[0]?.ImageUrl?.length > 0;
});

const mainImage = computed(() => {
  const firstImage = data.value.ImageGallery?.[0];

  return firstImage?.ImageUrl
    ? {
        url: firstImage.ImageUrl,
        desc: getValueOfLocale(firstImage.ImageDesc),
      }
    : {
        url: 'https://via.placeholder.com/700x350', // FIXME
        desc: 'Placeholder image',
      };
});

const contactSections = computed(() => {
  const details = getValueOfLocale(data.value.ContactInfos);
  return [
    {
      icon: 'IconDocument',
      content: [
        {
          title: t('datasets.quickView.nameCompanyName'),
          text: getTextValue(details?.CompanyName),
        },
        {
          title: t('datasets.quickView.firstName'),
          text: getTextValue(details?.Givenname),
        },
        {
          title: t('datasets.quickView.surname'),
          text: getTextValue(details?.Surname),
        },
      ],
    },
    {
      icon: 'IconBuilding',
      content: [
        {
          title: t('datasets.quickView.streetAndNumber'),
          text: getTextValue(details?.Address),
        },
        {
          title: t('datasets.quickView.city'),
          text: getTextValue(details?.City),
        },
        {
          title: t('datasets.quickView.zip'),
          text: getTextValue(details?.ZipCode),
        },
        {
          title: t('datasets.quickView.country'),
          text: getTextValue(details?.CountryName),
        },
      ],
    },
    {
      icon: 'IconPhonebook',
      content: [
        {
          title: t('datasets.quickView.email'),
          text: getTextValue(details?.Email),
        },
        {
          title: t('datasets.quickView.phoneNumber'),
          text: getTextValue(details?.Phonenumber),
        },
        {
          title: t('datasets.quickView.webUrl'),
          text: getTextValue(details?.Url),
        },
      ],
    },
  ];
});

const recordInformationSections = computed(() => {
  const lastUpdate = data?.value?._Meta?.LastUpdate;

  if (!lastUpdate) {
    return [];
  }

  const lastUpdateDate = new Date(lastUpdate).toISOString();
  const [year, month, day] = lastUpdateDate.split('T')[0].split('-');

  const isSourceActive = data.value.Active;
  const isODHActive = data.value.OdhActive;
  return [
    {
      icon: 'IconEditFilled',
      content: [
        {
          title: t('datasets.quickView.lastChanged'),
          text: `${day}.${month}.${year}`,
        },
      ],
    },
    {
      icon: 'IconServer',
      content: [
        {
          title: t('datasets.quickView.activeOnSource'),
          tag: getTagActiveInfoObject({
            active: isSourceActive,
          }),
        },
        {
          title: t('datasets.quickView.activeOnODH'),
          tag: getTagActiveInfoObject({
            active: isODHActive,
          }),
        },
      ],
    },
  ];
});

const map = computed(() => {
  if (!data.value.GpsInfo) {
    return {
      center: [],
      markers: [],
    };
  }

  const { Longitude, Latitude } = data.value.GpsInfo[0];

  const mapObj = {
    center: [Longitude, Latitude],
    markers: [
      {
        position: {
          lat: Latitude,
          lng: Longitude,
        },
      },
    ],
  };

  return mapObj;
});

const getTextValue = (value) => {
  return value ?? '/';
};

const getValueOfLocale = (obj) => {
  const fallbackLocale = 'en';

  return obj?.[currentLocale] || obj?.[fallbackLocale];
};

const openMapFullscreen = () => {
  const fullscreenButton = document.querySelector('.ol-full-screen > button');

  fullscreenButton.click();
};

const getTagActiveInfoObject = ({ active }) => {
  return {
    size: 'md',
    type: active ? 'blue' : 'yellow',
    text: active
      ? t('datasets.quickView.active')
      : t('datasets.quickView.inactive'),
    hasDot: true,
  };
};
</script>
