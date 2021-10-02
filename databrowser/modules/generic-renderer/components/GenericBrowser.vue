<template>
  <div>
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

    <div>
      <pre>{{ JSON.stringify(pagination) }}</pre>
      <pre>{{ JSON.stringify(fetchedData) }}</pre>
    </div>

    <GenericPaginationRenderer
      v-if="pagination != null"
      :pagination="pagination"
      @paginateNext="paginateNext"
      @paginatePrevious="paginatePrevious"
    ></GenericPaginationRenderer>

    <GenericDataRenderer
      v-if="fetchedData != null"
      class="bg-gray-100"
      :data="fetchedData"
      :render-config="currentOpenApiRenderConfig"
      @paginationChanges="paginationChanges"
    ></GenericDataRenderer>

    <GenericFilterRenderer
      v-if="openApiEndpointPathItem != null"
      class="bg-gray-100"
      :filters="filters"
      @filterChanges="filterChanges"
    ></GenericFilterRenderer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { OpenAPIV3 } from 'openapi-types';
import {
  BasePagination,
  PaginationUrlBuilder,
} from '../lib/pagination/pagination';
import { fetchData, FetchedData } from '../lib/data.provider';
import GenericPaginationRenderer from './pagination/GenericPaginationRenderer.vue';
import GenericDataRenderer from './GenericDataRenderer.vue';
import GenericFilterRenderer from './GenericFilterRenderer.vue';
import Alert from '~/components/global/Alert.vue';
import Select from '~/components/global/Select.vue';
import { FilterChanges } from '~/../web-components/databrowser-generic/src/generic/GenericFilter';
import { PaginationChanges } from '~/../web-components/databrowser-generic/src/generic/GenericList';
import { OpenApiState } from '~/store/remoteapi';
import { genericRenderConfig } from '~/modules/generic-renderer/config/generic-render.config';
import {
  ListConfig,
  ResourceConfig,
} from '~/../web-components/databrowser-generic/src/renderer/config.model';

const concatFilters = (values: string[]) =>
  values != null ? values.join(',') : '';

export default Vue.extend({
  components: {
    Alert,
    GenericDataRenderer,
    GenericFilterRenderer,
    GenericPaginationRenderer,
    Select,
  },
  data() {
    return {
      currentApiKey: null as unknown as string,
      fetchError: null as string | null,
      fetchedData: null as unknown as FetchedData | null | undefined,
      pagination: null as unknown as BasePagination | null | undefined,
      paginationBuilder: null as unknown as
        | PaginationUrlBuilder
        | null
        | undefined,
      filters: null as
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
        : Object.keys(this.currentDocument.paths).sort();
    },
    currentOpenApiRenderConfig(): ListConfig | ResourceConfig | undefined {
      return genericRenderConfig[this.currentApiKey]?.[
        this.openApiEndpointPath as string
      ];
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
        this.fetchedData = null;
        this.fetchError = null;
        return;
      }

      this.openApiEndpointPath = (event.target as HTMLSelectElement).value;
      this.openApiEndpointPathItem =
        this.currentDocument.paths[this.openApiEndpointPath];

      const deepCopy = JSON.parse(
        JSON.stringify(this.openApiEndpointPathItem)
      ) as OpenAPIV3.PathItemObject<number>;

      this.filters = deepCopy.get?.parameters;

      // Reset previous data
      this.fetchedData = null;
      // Reset previous error information
      this.fetchError = null;
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
        const { data, pagination, paginationBuilder } = await fetchData(
          this.$axios,
          fullUrl
        );
        this.fetchedData = data;
        this.pagination = pagination;
        this.paginationBuilder = paginationBuilder;
      } else {
        this.fetchError =
          'No server URL found for current API (see OpenAPI document)';
      }
    },
    // async paginateToPage(nextPage: number) {
    //   console.log('paginateToPage', nextPage);

    //   if (this.paginationBuilder != null && this.pagination != null) {
    //     const currentPage = getCurrentPage(this.pagination);
    //     let url = null;
    //     if (nextPage > currentPage) {
    //       url = this.paginationBuilder.getUrlForNextPage();
    //       debugger;
    //       await this.paginateToUrl(url);
    //     }
    //     if (nextPage < currentPage) {
    //       url = this.paginationBuilder.getUrlForPreviousPage();
    //       await this.paginateToUrl(url);
    //     }
    //     url = this.paginationBuilder.getUrlForCurrentPage();
    //     await this.paginateToUrl(url);
    //   }
    //   // eslint-disable-next-line no-console
    //   console.info('No pagination builder defined');
    // },
    async paginateToUrl(url: string) {
      const { data, pagination, paginationBuilder } = await fetchData(
        this.$axios,
        url
      );
      this.fetchedData = data;
      this.pagination = pagination;
      this.paginationBuilder = paginationBuilder;
    },
    async paginationChanges(event: CustomEvent<PaginationChanges>) {
      const url = event.detail.url;
      const { data, pagination, paginationBuilder } = await fetchData(
        this.$axios,
        url
      );
      this.fetchedData = data;
      this.pagination = pagination;
      this.paginationBuilder = paginationBuilder;
    },
    paginatePrevious() {
      const url = this.paginationBuilder?.getUrlForPreviousPage();
      if (url != null) {
        this.paginateToUrl(url);
      }
    },
    paginateNext() {
      const url = this.paginationBuilder?.getUrlForNextPage();
      if (url != null) {
        this.paginateToUrl(url);
      }
    },
  },
});
</script>
