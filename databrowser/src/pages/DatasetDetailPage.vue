<template>
  <div>
    Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
    {{ $route.params.datasetId }})
  </div>

  <div class="fixed bottom-0 py-5 w-full bg-gray-50">
    <DownloadSection
      dataset="https://api.datahub.curlpi.datahub.com/v1/charges/ch_/istchat/juati/ch_3Juaty2eZvKYlo2C0 atahub"
    />
  </div>
</template>

<script>
import DownloadSection from '../components/download/DownloadSection.vue';

export default {
  components: { DownloadSection },
};
</script>
