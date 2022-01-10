<template>
  <div class="flex justify-between space-x-4">
    <ViewPills :current-view="currentView" />
    <LanguagePicker v-if="!hideLangaugePicker" />
  </div>
</template>

<script lang="ts">
import ViewPills from './ViewPills.vue';
import { defineComponent, PropType } from '@vue/runtime-core';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import { ViewPill } from './types';

export default defineComponent({
  components: { LanguagePicker, ViewPills },
  props: {
    currentView: {
      type: String as PropType<ViewPill>,
      required: true,
    },
    hideLangaugePicker: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
