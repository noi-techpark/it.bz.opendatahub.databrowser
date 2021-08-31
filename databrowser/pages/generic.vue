<template>
  <div>
    <!-- Main content header -->
    <div
      class="
        flex flex-col
        items-start
        justify-between
        pb-6
        space-y-4
        border-b
        lg:items-center lg:space-y-0 lg:flex-row
      "
    >
      <h1 class="text-2xl font-semibold whitespace-nowrap">Generic Browser</h1>
    </div>

    <div class="py-4">
      <Button
        v-if="!$store.state.tourism.openapi.loaded"
        class="btn-blue"
        @click="loadData"
        ><span v-if="!$store.state.tourism.openapi.loading"
          >Click here to load information about Open Data Hub Tourism
          endpoints</span
        ><span v-else>Loading...</span></Button
      >
      <Select v-else class="select-blue" @change="endpointChanges">
        <option :key="null" :value="null">Select an endpoint</option>
        <option
          v-for="item in $store.getters['tourism/openapi/openApiPaths']"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>
      </Select>
    </div>

    <div v-if="fetchError != null" class="py-3">
      <Alert
        title="Fetch error"
        :content="fetchError"
        @close="fetchError = null"
      ></Alert>
    </div>

    <div v-if="endpointMethod != null">
      <h3 class="text-xl mt-4">{{ endpointMethod.summary }}</h3>
      <databrowser-generic-filter
        :parameters.prop="endpointMethod.parameters"
        @filterChanges="filterChanges"
      ></databrowser-generic-filter>
    </div>

    <div v-if="filteredData != null">
      {{ JSON.stringify(filteredData) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '~/components/global/Button.vue';
import Select from '~/components/global/Select.vue';
import * as OpenApi from '~/../web-components/databrowser-tourism/src/generic/endpoint.interface';
import { FilterChanges } from '~/../web-components/databrowser-tourism/src/generic/GenericFilter';

const concatFilters = (values: string[]) =>
  values != null ? values.join(',') : '';

export default Vue.extend({
  components: { Button, Select },
  data() {
    return {
      endpointUrl: null as unknown as string,
      endpointPath: null as OpenApi.EndpointPath | null | undefined,
      endpointMethod: null as OpenApi.EndpointMethod | null | undefined,
      fetchError: null as string | null,
      filteredData: null,
    };
  },
  methods: {
    loadData() {
      this.$store.dispatch('tourism/openapi/loadTourismData');
    },
    endpointChanges(event: Event) {
      this.endpointUrl = (event.target as HTMLSelectElement).value;

      const tmpEndpointPath =
        this.$store.state.tourism.openapi.api.paths[this.endpointUrl];

      if (tmpEndpointPath == null || tmpEndpointPath.get == null) {
        this.endpointPath = null;
        this.endpointMethod = null;
      } else {
        // Make defensive deep copy of data
        this.endpointPath = JSON.parse(
          JSON.stringify(tmpEndpointPath)
        ) as OpenApi.EndpointPath;
        this.endpointMethod = this.endpointPath.get;
      }

      // Reset previous error information
      this.fetchError = null;
    },
    async filterChanges(event: CustomEvent<FilterChanges>) {
      let url = this.endpointUrl;

      // Replace path params in URL
      const pathFilters = event.detail.filter?.path;
      if (pathFilters != null) {
        Object.keys(pathFilters).forEach((filterName) => {
          url = url.replaceAll(
            `{${filterName}}`,
            concatFilters(pathFilters[filterName])
          );
        });
      }

      // Add query params to URL
      const queryFilters = event.detail.filter?.query;
      if (queryFilters != null) {
        const queryParams = Object.keys(queryFilters).reduce(
          (prev, filterName) => [
            ...prev,
            `${filterName}=${concatFilters(queryFilters[filterName])}`,
          ],
          [] as string[]
        );
        if (queryParams.length) {
          url += `?${queryParams.join('&')}`;
        }
      }

      const fullUrl = this.$store.state.tourism.openapi.basePath + url;

      try {
        this.fetchError = null;
        this.filteredData = await this.$axios.$get(fullUrl);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Error while fetching ${fullUrl}`, e);
        this.filteredData = null;
        this.fetchError = e.message ?? e;
      }
    },
  },
});
</script>
