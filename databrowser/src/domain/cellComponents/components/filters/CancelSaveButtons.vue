<template>
  <div class="flex p-2 space-x-2">
    <ButtonCustom variant="ghost" @click="emit('cancel')">{{
      $t('components.cancelSave.cancel')
    }}</ButtonCustom>
    <ButtonCustom @click="emit('save')">{{
      $t('components.cancelSave.save')
    }}</ButtonCustom>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import { defineEmits } from 'vue';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'save'): void;
}>();
</script>
