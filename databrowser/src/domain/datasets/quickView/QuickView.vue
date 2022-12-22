<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <PageContent>
      <div
        class="flex flex-col gap-3 md:flex-row md:justify-between md:items-center"
      >
        <div>
          <h1 class="text-xl font-bold break-words">{{ title }}</h1>
          <p class="text-dialog break-words">ID:{{ id }}</p>
        </div>
        <div
          v-if="logoUrl"
          class="w-16 h-10 bg-center bg-no-repeat bg-contain"
          :style="{ backgroundImage: `url(${logoUrl})` }"
        ></div>
      </div>
      <div v-if="imageGallery.length <= 1 && mainImage" class="relative mt-5">
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
      v-if="imageGallery.length > 1"
      :images="imageGallery"
    />

    <PageContent>
      <div class="grid gap-8 mt-4 md:grid-cols-2">
        <div class="md:col-span-2">
          <QuickViewCardOverview
            :title="t('datasets.quickView.textInformation')"
            :sections="textInformationSections"
          />
        </div>
        <div class="flex flex-col gap-8">
          <QuickViewCardOverview
            :title="t('datasets.quickView.contact')"
            :sections="contactSections"
          />
          <QuickViewCardOverview
            :title="t('datasets.quickView.webcamDetails')"
            :content-has-no-padding="true"
            @cta-click="openMapFullscreen()"
          >
            <template #content>
              <QuickViewCardOverviewGallery :media-items="mediaItems" />
            </template>
          </QuickViewCardOverview>
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
                :key="map.center.length"
                :center="map.center"
                :markers="map.markers"
              />
            </template>
          </QuickViewCardOverview>
          <QuickViewCardOverview
            v-if="operationScheduleSections.length"
            :title="t('datasets.quickView.openingHours')"
            :sections="operationScheduleSections"
          />
          <QuickViewCardOverview
            :title="t('datasets.quickView.recordInformation')"
            :sections="recordInformationSections"
          />
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
import QuickViewCardOverviewGallery from '../../../components/quickview/QuickViewCardOverviewGallery.vue';
import QuickViewFullscreenGallery from '../../../components/quickview/QuickViewFullscreenGallery.vue';

const { isError, isSuccess, error, data } = useApiReadForCurrentDataset();

let forcePlaceholderImage = ref(false);

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
  if (!data.value.ImageGallery) {
    return null;
  }

  const firstImage = data.value.ImageGallery?.[0];

  return firstImage?.ImageUrl && !forcePlaceholderImage.value
    ? {
        url: firstImage.ImageUrl,
        desc: getValueOfLocale(firstImage.ImageDesc),
      }
    : {
        url: 'https://via.placeholder.com/700x350?text=Missing+image',
        desc: 'Placeholder image',
      };
});

const imageGallery = computed(() => {
  return data.value.ImageGallery || [];
});

const mediaItems = computed(() => {
  // FIXME: check Webcam returning values
  return data.value?.Webcam || getPlaceholderMediaItems();
});

const logoUrl = computed(() => {
  return getValueOfLocale(data.value.ContactInfos)?.LogoUrl;
});

const getPlaceholderMediaItems = () => {
  const items = [];

  for (let index = 0; index < 5; index++) {
    items.push({
      type: 'IMAGE',
      url: `https://picsum.photos/1280/720`,
      name: `Immagine di test ${index}`,
    });
  }
  items.push({
    type: 'VIDEO',
    url: `http://techslides.com/demos/sample-videos/small.mp4`,
    name: `Video di test`,
  });

  return items;
};

const textInformationSections = computed(() => {
  const details = getValueOfLocale(data.value.Detail);
  return [
    {
      content: [
        {
          title: 'Header',
          text: getTextValue(details?.Header),
        },
        {
          title: 'Subheader',
          text: getTextValue(details?.SubHeader),
        },
        {
          title: 'Introtext',
          text: getTextValue(details?.IntroText),
        },
      ],
    },
  ];
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

  // FIXME: change based on dataset
  const isSuedtirolInfoActive = false;
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
        {
          title: t('datasets.quickView.suedtirolInfoActive'),
          tag: getTagActiveInfoObject({
            active: isSuedtirolInfoActive,
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

const operationScheduleSections = computed(() => {
  if (!operationSchedule.value) {
    return [];
  }

  const sections = [];

  for (const schedule of operationSchedule.value) {
    sections.push({
      icon: 'IconClock',
      content: [
        {
          title: getTextValue(getValueOfLocale(schedule.OperationscheduleName)),
          text: schedule.TimePeriodRange,
        },
      ],
      fullwidthContent: [
        { operationScheduleTime: schedule.OperationScheduleTime },
      ],
    });
  }

  return sections;
});

const operationSchedule = computed(() => {
  let foundHours = false;

  const timing = data?.value?.OperationSchedule
    ? [...data.value.OperationSchedule]
    : [];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const parsedData = [];
  for (const time of timing) {
    const operationScheduleTime = [];

    for (const schedule of time?.OperationScheduleTime || []) {
      foundHours = true;
      const daysHours = [];
      const [startHour, startMinute] = schedule.Start.split(':');
      const [endHour, endMinute] = schedule.End.split(':');
      for (const d of days) {
        daysHours.push({
          Start: `${startHour}:${startMinute}`,
          End: `${endHour}:${endMinute}`,
          State: schedule.State,
          Timecode: schedule.Timecode,
          Day: d.slice(0, 3).toUpperCase(),
          Open: schedule[d],
        });
      }
      operationScheduleTime.push(daysHours);
    }
    time.OperationScheduleTime = operationScheduleTime;
    parsedData.push({
      ...time,
      OperationScheduleTime: operationScheduleTime,
      TimePeriodRange: getTimePeriodRange(time.Start, time.Stop),
    });
  }

  return foundHours ? parsedData : null;
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

const getTimePeriodRange = (start, end) => {
  const [yearStart, , dayStart] = start.split('T')[0].split('-');
  const [yearEnd, , dayEnd] = end.split('T')[0].split('-');

  const dateLocale = 'en-US';
  const dateOptions = {
    month: 'long',
  };

  const monthStart = new Date(start).toLocaleDateString(
    dateLocale,
    dateOptions
  );
  const monthEnd = new Date(end).toLocaleDateString(dateLocale, dateOptions);

  return `${parseInt(dayStart)}. ${monthStart}${
    yearStart !== yearEnd ? ' ' + yearStart : ''
  } - ${parseInt(dayEnd)}. ${monthEnd} ${yearEnd}`;
};

const getTagActiveInfoObject = ({ active }) => {
  return {
    size: 'md',
    type: active ? 'blue' : 'red',
    text: active
      ? t('datasets.quickView.active')
      : t('datasets.quickView.inactive'),
    hasDot: true,
  };
};

const onMainImageError = () => {
  forcePlaceholderImage.value = true;
};
</script>
