<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.contact')"
    :sections="contactSections"
  />
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import { getTextValue } from './QuickViewUtils';

import QuickViewCardOverview from './QuickViewCardOverview.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    companyName?: string;
    givenName?: string;
    surname?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    countryName?: string;
    email?: string;
    phoneNumber?: string;
    url?: string;
  }>(),
  {
    companyName: '',
    givenName: '',
    surname: '',
    address: '',
    city: '',
    zipCode: '',
    countryName: '',
    email: '',
    phoneNumber: '',
    url: '',
  }
);

const contactSections = computed(() => {
  return [
    {
      icon: 'IconDocument',
      content: [
        {
          title: t('datasets.quickView.nameCompanyName'),
          text: getTextValue(props.companyName),
        },
        {
          title: t('datasets.quickView.firstName'),
          text: getTextValue(props.givenName),
        },
        {
          title: t('datasets.quickView.surname'),
          text: getTextValue(props.surname),
        },
      ],
    },
    {
      icon: 'IconBuilding',
      content: [
        {
          title: t('datasets.quickView.streetAndNumber'),
          text: getTextValue(props.address),
        },
        {
          title: t('datasets.quickView.city'),
          text: getTextValue(props.city),
        },
        {
          title: t('datasets.quickView.zip'),
          text: getTextValue(props.zipCode),
        },
        {
          title: t('datasets.quickView.country'),
          text: getTextValue(props.countryName),
        },
      ],
    },
    {
      icon: 'IconPhonebook',
      content: [
        {
          title: t('datasets.quickView.email'),
          text: getTextValue(props.email),
        },
        {
          title: t('datasets.quickView.phoneNumber'),
          text: getTextValue(props.phoneNumber),
        },
        {
          title: t('datasets.quickView.webUrl'),
          text: getTextValue(props.url),
        },
      ],
    },
  ];
});
</script>
