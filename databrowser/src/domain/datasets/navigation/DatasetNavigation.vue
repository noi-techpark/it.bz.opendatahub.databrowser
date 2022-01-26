<template>
  <div class="flex justify-between space-x-4">
    <ViewPills :current-view="currentView" />
    <LanguagePicker v-if="!hideLangaugePicker" />
  </div>
</template>

<script setup lang="ts">
import ViewPills from './ViewPills.vue';
import { defineProps, withDefaults } from 'vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import { ViewPill } from './types';

withDefaults(
  defineProps<{
    currentView: ViewPill;
    hideLangaugePicker?: boolean;
  }>(),
  {
    hideLangaugePicker: false,
  }
);
</script>
