<template>
  <h1 class="text-2xl">Axios Page</h1>
  <p>This component shows the usage of axios</p>
  <div>
    <button
      type="button"
      class="
        bg-red-500
        hover:bg-red-700
        text-white text-center
        py-2
        px-4
        rounded
      "
      @click="fetchMobility"
    >
      Fetch OpenAPI description for the mobility dataset
    </button>
  </div>
  <pre>{{ openApiData?.data }}</pre>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      openApiData: null as unknown as { data: string },
    };
  },
  methods: {
    async fetchMobility() {
      this.openApiData = await this.axios.get(
        'https://mobility.api.opendatahub.bz.it/v2/apispec'
      );
    },
  },
});
</script>
