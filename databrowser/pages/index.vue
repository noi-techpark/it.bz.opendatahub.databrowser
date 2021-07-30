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
      <h1 class="text-2xl font-semibold whitespace-nowrap">ODHActivityPoi</h1>
    </div>

    <h3 class="mt-6 text-xl">Filter</h3>
    <div
      class="
        max-w-full
        min-h-full
        mt-6
        overflow-hidden overflow-x-auto
        border border-gray-200
        rounded-md
        p-4
      "
    >
      <databrowser-odh-activity-poi-filter
        @filterChanges="filterChanges"
      ></databrowser-odh-activity-poi-filter>
    </div>

    <h3 class="mt-6 text-xl">List</h3>
    <div
      class="
        max-w-full
        min-h-full
        mt-6
        overflow-hidden overflow-x-auto
        border border-gray-200
        rounded-md
        p-4
      "
    >
      <databrowser-odh-activity-poi-list
        :data.prop="odhActivityPoiList"
        @paginationChanges="paginationChanges"
        @detailRequested="detailRequested"
      ></databrowser-odh-activity-poi-list>
    </div>

    <h3 class="mt-6 text-xl">Detail</h3>
    <div
      class="
        max-w-full
        min-h-full
        mt-6
        overflow-hidden overflow-x-auto
        border border-gray-200
        rounded-md
        p-4
      "
    >
      <databrowser-odh-activity-poi-detail
        :data.prop="odhActivityPoiDetail"
      ></databrowser-odh-activity-poi-detail>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FilterChanges } from '~/../web-components/databrowser-tourism/src/odhActivityPoi/OdhActivityPoiFilter';
import {
  DetailRequested,
  PaginationChanges,
} from '~/../web-components/databrowser-tourism/src/odhActivityPoi/OdhActivityPoiList';

export default Vue.extend({
  data() {
    return {
      odhActivityPoiList: {},
      odhActivityPoiDetail: {},
    };
  },
  methods: {
    async filterChanges(event: CustomEvent<FilterChanges>) {
      const filterChangesValues = event.detail;
      const data = await this.$axios.$get(
        'https://api.tourism.testingmachine.eu/v1/ODHActivityPoi?',
        {
          params: filterChangesValues,
        }
      );
      this.odhActivityPoiList = data;
    },
    async paginationChanges(event: CustomEvent<PaginationChanges>) {
      const url = event.detail.url;
      const data = await this.$axios.$get(url);
      this.odhActivityPoiList = data;
    },
    async detailRequested(event: CustomEvent<DetailRequested>) {
      const url = event.detail.url;
      const data = await this.$axios.$get(url);
      this.odhActivityPoiDetail = data;
    },
  },
});
</script>
