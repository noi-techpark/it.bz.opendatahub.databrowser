<template>
  <div class="flex flex-col md:flex-row justify-end items-center">
    <div class="flex items-center">
      <span v-t="'datasets.listView.linesPerPage'" class="block mr-3"></span>
      <SelectCustom v-model="pageSize" class="mr-8">
        <option
          v-for="option in pageSizeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </SelectCustom>
    </div>
    <Paginator
      :pagination="pagination"
      class="pt-8 md:pt-0"
      @paginate-to="$emit('paginateTo', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import SelectCustom from '../../components/select/SelectCustom.vue';
import Paginator from '../../components/paginator/Paginator.vue';
import { Pagination } from '../../domain/api/types';

export default defineComponent({
  components: { SelectCustom, Paginator },
  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      required: false,
      default: () => null,
    },
    pageSizeOptions: {
      type: Array as PropType<{ value: string; label: string }[]>,
      required: false,
      default: () => [],
    },
  },
  emits: ['pageSizeChanges', 'paginateTo'],
  computed: {
    pageSize: {
      get() {
        return this.pagination?.size;
      },
      set(value: unknown) {
        this.$emit('pageSizeChanges', value);
      },
    },
  },
});
</script>
