<template>
  <div>
    Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
    {{ $route.params.datasetId }})
  </div>

  <div class="fixed bottom-4 w-full bg-white">
    <DownloadSection />
  </div>
</template>

<script>
import DownloadSection from '../components/download/DownloadSection.vue';

export default {
  components: { DownloadSection },
};
</script>
