<template>
  <div class="text-sm bg-gray-50">
    <div class="overflow-x-auto whitespace-nowrap">
      <ContentAlignmentX class="flex items-center">
        <ButtonLink
          variant="ghost"
          size="xs"
          class="flex items-center py-1 px-3 mr-2 h-6 bg-white md:mr-9"
          :to="tableViewPath"
        >
          <IconStrokedArrowDown
            class="mr-1 -ml-1 w-5 h-5 rotate-90 stroke-current"
          />
          <span class="line-height-1">
            {{ $t('datasets.navigation.tableView') }}
          </span>
        </ButtonLink>

        <DatasetNavigationLink
          :label="$t('datasets.navigation.quickView')"
          :to="quickViewPath"
          :active="isCurrentQuickView"
        />
        <DatasetNavigationLink
          :label="$t('datasets.navigation.detailView')"
          :to="detailViewPath"
          :active="isCurrentDetailView"
        />
        <DatasetNavigationLink
          :label="$t('datasets.navigation.rawView')"
          :to="rawViewPath"
          :active="isCurrentRawView"
        />
      </ContentAlignmentX>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import DatasetNavigationLink from './DatasetNavigationLink.vue';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';

const route = useRoute();

const detailViewPath = ref<RouteLocationRaw>('');
const quickViewPath = ref<RouteLocationRaw>('');
const rawViewPath = ref<RouteLocationRaw>('');
const tableViewPath = ref<RouteLocationRaw>('');
const isCurrentDetailView = ref(false);
const isCurrentQuickView = ref(false);
const isCurrentRawView = ref(false);

watch(
  route,
  (route) => {
    console.log('route', route);

    detailViewPath.value = { name: 'DatasetTableAndDetailPage' };
    quickViewPath.value = { name: 'DatasetQuickPage' };
    rawViewPath.value = { name: 'DatasetRawPage' };
    tableViewPath.value = {
      name: 'DatasetTableAndDetailPage',
      params: {
        pathParams: route.params.pathParams.slice(0, -1),
      },
    };

    isCurrentDetailView.value = route.name === detailViewPath.value.name;
    isCurrentQuickView.value = route.name === quickViewPath.value.name;
    isCurrentRawView.value = route.name === rawViewPath.value.name;
  },
  { immediate: true }
);
</script>
