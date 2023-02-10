<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.recordInformation')"
    :sections="recordInformationSections"
  />
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    lastUpdate: string;
    active: boolean;
    odhActive: boolean;
  }>(),
  {
    lastUpdate: '',
    active: false,
    odhActive: false,
  }
);

const recordInformationSections = computed(() => {
  const lastUpdate = props.lastUpdate;
  if (!lastUpdate) {
    return [];
  }

  const lastUpdateDate = new Date(lastUpdate).toISOString();
  const [year, month, day] = lastUpdateDate.split('T')[0].split('-');

  const isSourceActive = props.active;
  const isODHActive = props.odhActive;

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
</script>
