<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center">
    <button
      :id="`${id}-previous-page`"
      class="mr-4 rounded"
      :class="[hasPrevious ? 'text-green-500' : 'text-gray-400']"
      :disabled="!hasPrevious"
      :data-test="`${id}-previous-page`"
      @click="paginateTo(previousIndex)"
    >
      <IconStrokedArrowDown class="h-5 w-5 rotate-90 stroke-current" />
    </button>

    <div class="mr-2 flex items-center">
      <input
        :id="`${id}-page-input`"
        v-model="inputPageValue"
        class="border-r-none h-6 w-12 rounded rounded-r-none border-y border-l px-2 focus:border-green-500"
        :data-test="`${id}-page-input`"
        @keyup.enter="paginateTo(inputPageValue)"
      />
      <ButtonCustom
        :id="`${id}-paginate-to`"
        size="xs"
        class="h-6 w-9 rounded-l-none"
        :data-test="`${id}-paginate-to`"
        @click="paginateTo(inputPageValue)"
      >
        {{ t('datasets.listView.go') }}
      </ButtonCustom>
    </div>
    <span class="mr-4">{{ t('datasets.listView.of') }} {{ pageCount }}</span>

    <button
      :id="`${id}-next-page`"
      class="rounded"
      :class="[hasNext ? 'text-green-500' : 'text-gray-400']"
      :disabled="!hasNext"
      :data-test="`${id}-next-page`"
      @click="paginateTo(nextIndex)"
    >
      <IconStrokedArrowDown class="h-5 w-5 -rotate-90 stroke-current" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { Pagination } from '../../domain/api';
import { watch } from 'vue';
import IconStrokedArrowDown from '../svg/IconStrokedArrowDown.vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { useI18n } from 'vue-i18n';
import { randomId } from '../utils/random';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{ pagination: Pagination; id?: string }>(),
  { id: randomId() }
);

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
