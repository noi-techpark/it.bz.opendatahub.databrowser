<template>
  <ContentAlignmentX class="flex flex-row justify-between py-4">
    <div class="flex items-center">
      <router-link to="/" class="rounded">
        <img
          :alt="t('header.logo')"
          class="h-8"
          src="/logo-open-data-hub-black.png"
        />
      </router-link>
      <div class="inline-flex items-center ml-4">
        <OverlayMenu :items="data" />
      </div>
    </div>
    <MenuUserSection />
  </ContentAlignmentX>
</template>

<script lang="ts" setup>
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import OverlayMenu from './menu/OverlayMenu.vue';
import { MenuColumn } from './menu/OverlayMenuList.vue';
import MenuUserSection from '../domain/auth/MenuUserSection.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Static data for testing only.
// This block of data will be replaces with the generated data from the config
const data: MenuColumn = {
  label: t('header.menu.allDatasets'),
  items: [
    {
      label: 'Places',
      items: [
        {
          label: 'Locations',
          items: [
            {
              label: 'Areas',
              url: '/dataset/table/tourism/v1/Area',
            },
            {
              label: 'Districts',
              url: '/dataset/table/tourism/v1/District',
            },
            {
              label: 'Experience Areas',
              url: '/dataset/table/tourism/v1/ExperienceArea',
            },
            {
              label: 'Gastronomy',
              url: '/dataset/table/tourism/v1/Gastronomy',
            },
            {
              label: 'Gastronomy Types',
              url: '/dataset/table/tourism/v1/GastronomyTypes',
            },
            {
              label: 'Locations',
              url: '/dataset/table/tourism/v1/Location',
            },
            {
              label: 'Meta Regions',
              url: '/dataset/table/tourism/v1/MetaRegion',
            },
            {
              label: 'Municipalities',
              url: '/dataset/table/tourism/v1/Municipality',
            },
            {
              label: 'Regions',
              url: '/dataset/table/tourism/v1/Region',
            },
            {
              label: 'Ski Areas',
              url: '/dataset/table/tourism/v1/SkiArea',
            },
            {
              label: 'Ski Area List',
              url: '/dataset/table/tourism/v1/Location/Skiarea',
            },
            {
              label: 'Ski Regions',
              url: '/dataset/table/tourism/v1/SkiRegion',
            },
            {
              label: 'Venues',
              url: '/dataset/table/tourism/v1/Venue',
            },
            {
              label: 'Venue Types',
              url: '/dataset/table/tourism/v1/VenueTypes',
            },
          ],
        },
        {
          label: 'POIs',
          items: [
            {
              label: 'Activities and Points of Interest (POIs)',
              url: '/dataset/table/tourism/v1/ODHActivityPoi',
            },
            {
              label: 'Activities and Points of Interest types',
              url: '/dataset/table/tourism/v1/ODHActivityPoiTypes',
            },
            {
              label: 'Points of Interest (POIs)',
              url: '/dataset/table/tourism/v1/Poi',
            },
            {
              label: 'Points of Interest types',
              url: '/dataset/table/tourism/v1/PoiTypes',
            },
          ],
        },
      ],
    },
    {
      label: 'Accommodations',
      items: [
        {
          label: 'Accommodation',
          url: '/dataset/table/tourism/v1/Accommodation',
        },
        {
          label: 'Accommodation Types',
          url: '/dataset/table/tourism/v1/AccommodationTypes',
        },
        {
          label: 'Accommodation Features',
          url: '/dataset/table/tourism/v1/AccommodationFeatures',
        },
      ],
    },
    {
      label: 'Activities and Events',
      items: [
        {
          label: 'Activities',
          items: [
            {
              label: 'Activities',
              url: '/dataset/table/tourism/v1/Activity',
            },
            {
              label: 'Activity Types',
              url: '/dataset/table/tourism/v1/ActivityTypes',
            },
          ],
        },
        {
          label: 'Events',
          items: [
            {
              label: 'Events',
              url: '/dataset/table/tourism/v1/Event',
            },
            {
              label: 'Event Topics',
              url: '/dataset/table/tourism/v1/EventTopics',
            },
            {
              label: 'Event Short',
              url: '/dataset/table/tourism/v1/EventShort',
            },
            {
              label: 'Event Short by Room Occupation',
              url: '/dataset/table/tourism/v1/EventShort/GetbyRoomBooked',
            },
          ],
        },
      ],
    },
    {
      label: 'Others',
      items: [
        {
          label: 'Articles',
          items: [
            {
              label: 'Articles',
              url: '/dataset/table/tourism/v1/Article',
            },
            {
              label: 'Article Types',
              url: '/dataset/table/tourism/v1/ArticleTypes',
            },
          ],
        },
        {
          label: 'Weather',
          items: [
            {
              label: 'Current Realtime Weather LIVE',
              url: '/dataset/table/tourism/v1/Weather/Realtime',
            },
            {
              label: 'Current Suedtirol Weather LIVE',
              url: '/dataset/table/tourism/v1/Weather',
            },
            {
              label: 'District Weather LIVE',
              url: '/dataset/table/tourism/v1/Weather/District',
            },
            {
              label: 'Weather Measuringpoints',
              url: '/dataset/table/tourism/v1/Weather/Measuringpoint',
            },
            {
              label: 'SnowReport',
              url: '/dataset/table/tourism/v1/Weather/SnowReport',
            },
          ],
        },
        {
          label: 'ODH Tags',
          url: '/dataset/table/tourism/v1/ODHTag',
        },
        {
          label: 'Tourism Associations',
          url: '/dataset/table/tourism/v1/TourismAssociation',
        },
        {
          label: 'Webcams',
          url: '/dataset/table/tourism/v1/WebcamInfo',
        },
        {
          label: 'Wine Awards',
          url: '/dataset/table/tourism/v1/WineAward',
        },
      ],
    },
  ],
};
</script>
