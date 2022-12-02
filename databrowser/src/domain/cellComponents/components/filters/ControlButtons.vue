<template>
  <div class="flex space-x-2 p-2">
    <ButtonCustom variant="ghost" @click="emit('cancel')">{{
      t('components.cancel')
    }}</ButtonCustom>
    <ButtonCustom @click="emit('save')">{{
      t('components.save')
    }}</ButtonCustom>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import { defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'save'): void;
}>();
</script>
