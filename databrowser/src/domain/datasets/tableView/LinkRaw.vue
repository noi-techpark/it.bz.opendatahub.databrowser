<template>
  <router-link
    :to="{
      name: 'DatasetsRawViewPage',
      params: { datasetId: id },
    }"
    class="
      flex
      justify-center
      items-center
      m-1
      w-8
      h-8
      hover:bg-gray-300
      rounded
      border
      text-xs text-green-500
    "
  >
    RAW
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps<{
  id: string;
}>();

const { id } = toRefs(props);
</script>
