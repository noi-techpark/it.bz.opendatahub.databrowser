<template>
  <div class="flex justify-between w-full bg-green-500">
    <EditFooterButton @click="cancel">
      <IconClose class="mr-2 h-4" />
      <span>{{ t('datasets.editView.footer.cancel') }}</span>
    </EditFooterButton>
    <EditFooterButton @click="save">
      <IconCheck class="mr-2 h-4" />
      <span>{{ t('datasets.editView.footer.save') }}</span>
    </EditFooterButton>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, watch } from 'vue';
import EditFooterButton from './EditFooterButton.vue';
import IconClose from '../../../components/svg/IconClose.vue';
import IconCheck from '../../../components/svg/IconCheck.vue';
import { useMagicKeys } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['cancel', 'save']);

const { alt_s, escape } = useMagicKeys();

const cancel = () => emit('cancel');
const save = () => emit('save');

watch(escape, (key) => {
  if (key) {
    cancel();
  }
});

watch(alt_s, (key) => {
  if (key) {
    save();
  }
});
</script>
