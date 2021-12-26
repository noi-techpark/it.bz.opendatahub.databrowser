<template>
  Dataset Detail Page (type = {{ datasetType }}, ID = {{ datasetId }})
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const datasetType = route.params.datasetType;
const datasetId = route.params.datasetId;
</script>
