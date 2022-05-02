<template>
  <div class="flex justify-end items-center py-2 text-xs bg-gray-50">
    <span class="block mr-3">{{ $t('datasets.listView.linesPerPage') }}</span>
    <SelectCustom
      class="mr-6 w-16"
      :options="paginationOptions"
      @change="$emit('pageSizeChanges', $event)"
    />
    <Paginator
      :pagination="pagination"
      @paginate-to="$emit('paginateTo', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import SelectCustom from '../../../components/select/SelectCustom.vue';
import Paginator from '../../../components/paginator/Paginator.vue';
import { Pagination } from '../../api/client/types';

defineProps<{
  pagination: Pagination;
  paginationOptions: { value: string; label: string; selected?: boolean }[];
}>();

defineEmits(['pageSizeChanges', 'paginateTo']);
</script>
