<template>
  <div class="flex items-center justify-end bg-gray-50 py-2 text-xs">
    <span class="mr-3 block">{{ t('datasets.listView.linesPerPage') }}</span>
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
import { Pagination } from '../../api';
import { useI18n } from 'vue-i18n';
import { SelectOption } from '../../../components/select/types';

const { t } = useI18n();

defineProps<{
  pagination: Pagination;
  paginationOptions: SelectOption[];
}>();

defineEmits(['pageSizeChanges', 'paginateTo']);
</script>
