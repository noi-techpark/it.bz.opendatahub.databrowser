<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <div>To be done</div>
  </template>
</template>

<script lang="ts" setup>
import LoadingError from '../../../components/loading/LoadingError.vue';
import { useApiReadForCurrentDataset } from '../../api';

const { isError, isSuccess, error } = useApiReadForCurrentDataset();
</script>
