<template>
  <template v-if="isError">
    <div class="bg-red-200">
      <h2>Got error from API</h2>
      <div>{{ error }}</div>
    </div>
  </template>
  <template v-if="isSuccess === true">
    <div>To be done</div>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { isError, isSuccess, error } = useApiForViewConfig({
  viewConfig,
});
</script>
