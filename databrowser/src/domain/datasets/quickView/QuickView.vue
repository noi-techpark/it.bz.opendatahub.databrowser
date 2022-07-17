<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>To be done</div>
  </template>
</template>

<script lang="ts" setup>
import { useApiForCurrentDataset } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';

const { isError, isSuccess, error } = useApiForCurrentDataset();
</script>
