<template>
  <div class="flex space-x-3">
    <!--
      There is a race-condition bug in case the pathParams
      contains just one entry (e.g. 'odh-accommodation') and
      the user switches from detail- / raw-view to the table
      view. In that case, the check for "isTableActive" may
      yield a "false" value, which removes the single entry
      in pathParams which in turn causes an exception, because
      there are no route matches. Thats why the check for
      pathParams.length is necessary.
      TODO: check for better solution
    -->
    <PillLink
      :to="{
        name: 'DatasetTableAndDetailPage',
        params: {
          pathParams:
            !isTableActive && pathParams.length > 1
              ? pathParams.slice(0, -1)
              : pathParams,
        },
        query: { language },
      }"
      :active="isTableActive"
      >Table view
    </PillLink>

    <PillLink
      :disabled="isTableActive"
      :to="{
        name: 'DatasetTableAndDetailPage',
        params: {
          pathParams,
        },
        query: { language },
      }"
      :active="isDetailActive"
      >Detail view</PillLink
    >

    <PillLink
      :disabled="isTableActive"
      :to="{
        name: 'DatasetRawPage',
        params: {
          pathParams,
        },
        query: { language },
      }"
      :active="isRawActive"
      >Raw Data</PillLink
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import PillLink from '../../../components/pill/PillLink.vue';
import { ViewPill } from './types';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApiQuery } from '../../api/service/apiQueryHandler';

const props = defineProps<{
  currentView: ViewPill;
}>();

const { currentView } = toRefs(props);

const isTableActive = computed(() => currentView.value === ViewPill.table);
const isDetailActive = computed(() => currentView.value === ViewPill.detail);
const isRawActive = computed(() => currentView.value === ViewPill.raw);

const language = useApiQuery().useApiParameter('language');

const route = useRoute();
const pathParams = computed(() =>
  Array.isArray(route.params.pathParams)
    ? route.params.pathParams
    : [route.params.pathParams]
);
</script>
