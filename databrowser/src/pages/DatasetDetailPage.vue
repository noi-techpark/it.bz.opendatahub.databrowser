<template>
  <div>
    Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
    {{ $route.params.datasetId }})
  </div>

  <DownloadSection />
</template>

<script>
import DownloadSection from '../components/download/DownloadSection.vue';

export default {
  components: { DownloadSection },
};
</script>
