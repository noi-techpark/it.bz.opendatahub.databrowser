<template>
  <ContentArea
    class="flex justify-between py-7 space-x-4 border-b border-gray-200"
  >
    <ViewPills :current-view="currentView" />
    <LanguagePicker />
  </ContentArea>
</template>

<script lang="ts">
import ViewPills from './ViewPills.vue';
import { defineComponent, PropType } from '@vue/runtime-core';
import ContentArea from '../../../components/content/ContentArea.vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import { ViewPill } from './types';

export default defineComponent({
  components: { LanguagePicker, ContentArea, ViewPills },
  props: {
    currentView: {
      type: String as PropType<ViewPill>,
      required: true,
    },
  },
});
</script>
