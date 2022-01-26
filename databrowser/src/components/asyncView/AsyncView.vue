<template>
  <slot v-if="asyncState === AsyncState.FETCHING" name="loading"></slot>
  <slot
    v-if="asyncState === AsyncState.FINISHED_WITH_SUCCESS"
    :data="data"
    name="success"
  ></slot>
  <slot
    v-if="asyncState === AsyncState.FINISHED_WITH_ERROR"
    :error="error"
    name="error"
  ></slot>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { AsyncState, getAsyncState } from './asyncState';
import { AxiosError, AxiosResponse } from 'axios';

const props = defineProps<{
  data: AxiosResponse<any, any> | null | undefined;
  error: Error | AxiosError | null | undefined;
}>();

const asyncState = computed(() => getAsyncState(props.data, props.error));
</script>
