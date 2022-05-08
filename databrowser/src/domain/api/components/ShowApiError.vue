<template>
  <div class="bg-red-200">
    <h2>Got error from API</h2>
    <div>{{ errorAsString }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { toErrorString } from '../../api/service/utils';
const props = defineProps<{ error: unknown }>();

const errorAsString = ref<string>('');

watch(
  () => props.error,
  (error) => (errorAsString.value = toErrorString(error)),
  { immediate: true }
);
</script>
