<template>
  <AlertError :title="'Got error from API'" :content="errorAsString" />
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { toErrorString } from '../service/utils';
import AlertError from '../../../components/alert/AlertError.vue';
const props = defineProps<{ error: unknown }>();

const errorAsString = ref<string>('');

watch(
  () => props.error,
  (error) => (errorAsString.value = toErrorString(error)),
  { immediate: true }
);
</script>
