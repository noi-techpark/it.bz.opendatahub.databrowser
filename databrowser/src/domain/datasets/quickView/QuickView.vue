<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>To be done</div>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { isError, isSuccess, error } = useApiForViewConfig({
  viewConfig,
});
</script>
