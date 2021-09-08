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

    <div v-if="filteredData != null">
      <div v-if="filteredData['TotalResults'] != null">
        <h3 class="text-xl mt-4">List data</h3>
        <databrowser-generic-list
          :data.prop="filteredData"
          @paginationChanges="paginationChanges"
        ></databrowser-generic-list>
      </div>
      <div v-else>{{ JSON.stringify(filteredData) }}</div>
    </div>

    <div v-if="openApiEndpointPath != null">
      <h3 class="text-xl mt-4">{{ openApiEndpointPath.summary }}</h3>
      <databrowser-generic-filter
        :parameters.prop="filterParameters"
        @filterChanges="filterChanges"
      ></databrowser-generic-filter>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { OpenAPIV3 } from 'openapi-types';
import Button from '~/components/global/Button.vue';
import Select from '~/components/global/Select.vue';
import { FilterChanges } from '~/../web-components/databrowser-generic/src/generic/GenericFilter';
import { PaginationChanges } from '~/../web-components/databrowser-generic/src/generic/GenericList';

const concatFilters = (values: string[]) =>
  values != null ? values.join(',') : '';

export default Vue.extend({
  components: { Button, Select },
  data() {
    return {
      endpointUrl: null as unknown as string,
      openApiEndpointPath: null as OpenAPIV3.PathItemObject | null | undefined,
      filterParameters: null as
        | (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]
        | null
        | undefined,
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

      const openApiDocument = this.$store.state.tourism.openapi
        .api as OpenAPIV3.Document;
      const openApiPaths = openApiDocument.paths;
      this.openApiEndpointPath = openApiPaths[this.endpointUrl];

      if (
        this.openApiEndpointPath == null ||
        this.openApiEndpointPath.get == null
      ) {
        this.openApiEndpointPath = null;
        this.filterParameters = null;
        this.fetchError = null;
      } else {
        const deepCopy = JSON.parse(
          JSON.stringify(this.openApiEndpointPath)
        ) as OpenAPIV3.PathItemObject<number>;

        this.filterParameters = deepCopy.get?.parameters;
      }

      // Reset previous data
      this.filteredData = null;
      // Reset previous error information
      this.fetchError = null;
    },
    async fetchData(url: string) {
      try {
        this.fetchError = null;
        this.filteredData = await this.$axios.$get(url);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Error while fetching ${url}`, e);
        this.filteredData = null;
        this.fetchError = e.message ?? e;
      }
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
      await this.fetchData(fullUrl);
    },
    async paginationChanges(event: CustomEvent<PaginationChanges>) {
      const url = event.detail.url;
      await this.fetchData(url);
    },
  },
});
</script>
