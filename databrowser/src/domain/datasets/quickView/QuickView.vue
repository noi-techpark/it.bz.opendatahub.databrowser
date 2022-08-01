<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>To be done</div>
  </template>
</template>

<script lang="ts" setup>
import { useApiReadForCurrentDataset } from '../../api';
import ShowApiError from '../../api/components/ShowApiError.vue';

const { isError, isSuccess, error } = useApiReadForCurrentDataset();
</script>
