<template>
  <div
    v-if="pagination != null"
    class="flex flex-col justify-end items-center md:flex-row"
  >
    <div class="flex items-center">
      <span v-t="'datasets.listView.linesPerPage'" class="block mr-3"></span>
      <SelectCustom
        class="w-20"
        :options="pageSizeOptions"
        @change="pageSize = $event"
      ></SelectCustom>
    </div>
    <Paginator
      :pagination="pagination"
      class="pt-8 md:pt-0"
      @paginate-to="paginateTo($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';
import SelectCustom from '../../../components/select/SelectCustom.vue';
import Paginator from '../../../components/paginator/Paginator.vue';
import { Pagination } from '../../api/client/types';
import { computed } from 'vue';

const props = defineProps<{
  pagination?: Pagination;
  pageSizeOptions?: { value: string; label: string }[];
}>();

const { pagination, pageSizeOptions } = toRefs(props);

const emits = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'pageSizeChanges', value: string): void;
  // eslint-disable-next-line no-unused-vars
  (e: 'paginateTo', value: string): void;
}>();

const pageSize = computed({
  get: () => pagination?.value?.size.toString() ?? '0',
  set: (value) => emits('pageSizeChanges', value),
});

const paginateTo = (value: number) => emits('paginateTo', value.toString());
</script>
