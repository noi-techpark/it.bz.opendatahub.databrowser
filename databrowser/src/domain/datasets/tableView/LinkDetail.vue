<template>
  <router-link
    :to="{
      name: 'DatasetsDetailViewPage',
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
    "
  >
    <EyeDetailGreen />
  </router-link>
</template>

<script setup lang="ts">
import EyeDetailGreen from '../../../components/svg/EyeDetailGreen.vue';
import { defineProps, toRefs } from 'vue';

const props = defineProps<{
  id: string;
}>();

const { id } = toRefs(props);
</script>
