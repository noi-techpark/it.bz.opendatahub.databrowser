<template>
  <ContentAlignmentX class="hidden items-center mt-3 md:flex">
    <div class="mr-4 text-sm">
      {{ t('datasets.detailView.showEmptyFields') }}
    </div>
    <ToggleCustom v-model="showAll" :disabled="disabled" />
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import ToggleCustom from '../../../../components/toggle/ToggleCustom.vue';
import ContentAlignmentX from '../../../../components/content/ContentAlignmentX.vue';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{ modelValue?: boolean; disabled?: boolean }>();

const showAll = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
