<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center">
    <button
      class="mr-4 rounded"
      :class="[hasPrevious ? 'text-green-500' : 'text-gray-400']"
      :disabled="!hasPrevious"
      @click="paginateTo(previousIndex)"
    >
      <IconStrokedArrowDown class="w-5 h-5 rotate-90 stroke-current" />
    </button>

    <div class="flex items-center mr-2">
      <input
        v-model="inputPageValue"
        class="px-2 w-12 h-6 rounded rounded-r-none border-y border-l focus:border-green-500 border-r-none"
        @keyup.enter="paginateTo(inputPageValue)"
      />
      <ButtonCustom
        size="xs"
        class="w-9 h-6 rounded-l-none"
        @click="paginateTo(inputPageValue)"
      >
        {{ t('datasets.listView.go') }}
      </ButtonCustom>
    </div>
    <span class="mr-4">{{ t('datasets.listView.of') }} {{ pageCount }}</span>

    <button
      class="rounded"
      :class="[hasNext ? 'text-green-500' : 'text-gray-400']"
      :disabled="!hasNext"
      @click="paginateTo(nextIndex)"
    >
      <IconStrokedArrowDown class="w-5 h-5 -rotate-90 stroke-current" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { Pagination } from '../../domain/api/client/types';
import { watch } from 'vue';
import IconStrokedArrowDown from '../svg/IconStrokedArrowDown.vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{ pagination: Pagination }>();

const emits = defineEmits(['paginateTo']);

const pageCount = ref(0);
const previousIndex = ref(0);
const nextIndex = ref(0);
const hasPrevious = ref(false);
const hasNext = ref(false);
const inputPageValue = ref(props.pagination.page);

watch(
  () => props.pagination,
  (pagination) => {
    pageCount.value = Math.floor(pagination.total / pagination.size) + 1;
    previousIndex.value = Math.max(pagination.page - 1, 1);
    nextIndex.value = Math.min(pagination.page + 1, pageCount.value);
    hasPrevious.value = pagination.page > 1;
    hasNext.value = pagination.page < pageCount.value;
    inputPageValue.value = pagination.page;
  },
  { immediate: true }
);

const paginateTo = (value: string | number) => {
  const numberValue = typeof value === 'string' ? parseInt(value, 10) : value;
  emits('paginateTo', numberValue);
};
</script>
