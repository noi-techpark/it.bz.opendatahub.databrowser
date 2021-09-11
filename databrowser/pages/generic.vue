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

    <div class="py-2">
      <h3>Select an API{{ apiLoading ? ' (Loading...)' : null }}</h3>
      <Select class="select-blue" @change="apiChanges">
        <option :key="null" :value="null">-- Select an API --</option>
        <option
          v-for="key in $store.getters['remoteapi/apiKeys']"
          :key="key"
          :value="key"
        >
          {{ $store.getters['remoteapi/apiDescriptionByKey'](key) }}
        </option>
      </Select>
    </div>
    <div class="py-2">
      <h3>
        {{ 'Select an Endpoint' }}
      </h3>
      <Select
        class="select-blue"
        :disabled="currentDocument == null"
        @change="pathChanges"
      >
        <option :key="null" :value="null">-- Select an endpoint --</option>
        <option v-for="item in currentDocumentPaths" :key="item" :value="item">
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

    <div v-if="openApiEndpointPathItem != null">
      <h3 class="text-xl mt-4">{{ openApiEndpointPathItem.summary }}</h3>
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
import Select from '~/components/global/Select.vue';
import { FilterChanges } from '~/../web-components/databrowser-generic/src/generic/GenericFilter';
import { PaginationChanges } from '~/../web-components/databrowser-generic/src/generic/GenericList';
import { OpenApiState } from '~/store/remoteapi';

const concatFilters = (values: string[]) =>
  values != null ? values.join(',') : '';

export default Vue.extend({
  components: { Select },
  data() {
    return {
      currentApiKey: null as unknown as string,
      currentApiUrl: null as unknown as string,
      fetchError: null as string | null,
      filteredData: null as any,
      filterParameters: null as
        | (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]
        | null
        | undefined,
      openApiEndpointPath: null as string | null,
      openApiEndpointPathItem: null as
        | OpenAPIV3.PathItemObject
        | null
        | undefined,
    };
  },
  computed: {
    apiLoading(): boolean {
      return this.currentApi != null && this.currentApi?.loading;
    },
    currentApi(): OpenApiState | undefined {
      return this.$store.getters['remoteapi/apiByKey'](this.currentApiKey);
    },
    currentDocument(): OpenAPIV3.Document | undefined {
      return this.$store.getters['remoteapi/documentByKey'](this.currentApiKey);
    },
    currentDocumentPaths(): string[] {
      return this.currentDocument == null || this.currentDocument.paths == null
        ? []
        : Object.keys(this.currentDocument.paths);
    },
  },
  methods: {
    apiChanges(event: Event) {
      this.currentApiKey = (event.target as HTMLSelectElement).value;
      this.$store.dispatch('remoteapi/selectApi', {
        key: this.currentApiKey,
      });
    },
    pathChanges(event: Event) {
      // Return early if no current docuement is set or if the current document has no paths
      if (this.currentDocument == null || this.currentDocument.paths == null) {
        this.openApiEndpointPath = null;
        this.openApiEndpointPathItem = null;
        this.filterParameters = null;
        this.fetchError = null;
        return;
      }

      this.openApiEndpointPath = (event.target as HTMLSelectElement).value;
      this.openApiEndpointPathItem =
        this.currentDocument.paths[this.openApiEndpointPath];

      const deepCopy = JSON.parse(
        JSON.stringify(this.openApiEndpointPathItem)
      ) as OpenAPIV3.PathItemObject<number>;

      this.filterParameters = deepCopy.get?.parameters;

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
        this.fetchError = e instanceof Error ? e.message : (e as string);
      }
    },
    async filterChanges(event: CustomEvent<FilterChanges>) {
      let path = this.openApiEndpointPath ?? '';

      // Replace path params in URL
      const pathFilters = event.detail.filter?.path;
      if (pathFilters != null) {
        Object.keys(pathFilters).forEach((filterName) => {
          path = path.replaceAll(
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
          path += `?${queryParams.join('&')}`;
        }
      }

      if (
        this.currentDocument?.servers != null &&
        this.currentDocument.servers.length > 0
      ) {
        // Take first server URL from OpenAPI document. Maybe this should be configurable
        const fullUrl = this.currentDocument.servers[0].url + path;
        await this.fetchData(fullUrl);
      } else {
        this.fetchError =
          'No server URL found for current API (see OpenAPI document)';
      }
    },
    async paginationChanges(event: CustomEvent<PaginationChanges>) {
      const url = event.detail.url;
      await this.fetchData(url);
    },
  },
});
</script>
