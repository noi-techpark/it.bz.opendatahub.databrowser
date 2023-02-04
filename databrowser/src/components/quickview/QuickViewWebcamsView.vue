<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.webcamDetails')"
    :sections="[]"
    content-has-no-padding
  >
    <template #content>
      <QuickViewCardOverviewGallery :media-items="webcamsMediaItems" />
    </template>
  </QuickViewCardOverview>
</template>
<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';
import QuickViewCardOverviewGallery from './QuickViewCardOverviewGallery.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    webcamsMediaItems: any;
  }>(),
  {
    webcamsMediaItems: () => {},
  }
);

const webcamsMediaItems = computed(() => {
  return props.webcamsMediaItems || getPlaceholderMediaItems(); // FIXME: the placeholder media items have been introduced only as an example of the component functionality. The should be removed in the final version
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
</script>
