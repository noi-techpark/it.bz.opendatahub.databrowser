<template>
  <h1 class="text-2xl">Axios Page</h1>
  <p>
    This component shows the usage of
    <a
      href="https://www.npmjs.com/package/vue-axios"
      class="underline"
      target="_blank"
      >axios</a
    >
    and
    <a
      href="https://www.npmjs.com/package/vue-query"
      class="underline"
      target="_blank"
      >vue-query</a
    >
  </p>
  <div>
    <button
      type="button"
      class="
        py-2
        px-4
        bg-red-500
        hover:bg-red-700
        rounded
        text-white text-center
      "
      @click="refetch()"
    >
      Fetch OpenAPI description for the mobility dataset
    </button>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/runtime-core';
import { useQuery } from 'vue-query';
import { AxiosInstance } from 'axios';

export default defineComponent({
  setup() {
    const axios = inject<AxiosInstance>('axios');

    if (axios != null) {
      const fetcher = async (): Promise<string> =>
        await axios.get('https://mobility.api.opendatahub.bz.it/v2/apispec');

      const { isLoading, isError, isFetching, data, error, refetch } = useQuery(
        'mobilityOpenApi',
        fetcher,
        { enabled: false }
      );

      return { isLoading, isError, isFetching, data, error, refetch };
    }

    throw new Error('Injected axios instance is undefined');
  },
});
</script>
