<template>
  <slot v-if="AsyncState.FETCHING == asyncState" name="loading"></slot>
  <slot
    v-if="AsyncState.FINISHED_WITH_SUCCESS == asyncState"
    :data="data"
    name="success"
  ></slot>
  <slot
    v-if="AsyncState.FINISHED_WITH_ERROR == asyncState"
    :error="error"
    name="error"
  ></slot>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { AsyncState, getAsyncState } from './asyncState';

const props = defineProps<{
  data: unknown;
  error: unknown;
}>();

const asyncState = computed(() => getAsyncState(props.data, props.error));
</script>
