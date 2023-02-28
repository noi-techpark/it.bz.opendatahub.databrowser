<template>
  <ToolBox
    :visible="false"
    :tab-names="['Search and filter', 'Export datasets']"
  >
    <TabPanel>
      <ToolBoxCard label="Basic Search" :break-all="true" :is-filter="true">
        <template #icon>
          <TagCustom text="BETA" type="info" class="font-normal" />
        </template>
        <template #default>
          <InputSearch
            id="search-dataset"
            :model-value="searchFilterAsString"
            :focus="true"
            @search="search"
          />
        </template>
      </ToolBoxCard>
    </TabPanel>
    <TabPanel>
      <ExportDataset :url="url" />
    </TabPanel>
  </ToolBox>
  <div></div>
</template>

<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
import { computed } from 'vue';
import InputSearch from '../../../components/input/InputSearch.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { useApiQuery } from '../../api';
import ExportDataset from '../toolbox/ExportDataset.vue';
import ToolBox from '../toolbox/ToolBox.vue';
import ToolBoxCard from '../toolbox/ToolBoxCard.vue';

defineProps<{ url: string }>();

const { updateApiParameterValue, useApiParameter } = useApiQuery();

const searchFilter = useApiParameter('searchfilter');
const searchFilterAsString = computed(
  () => searchFilter.value?.toString() ?? ''
);

const search = (term: string) => {
  const value = term === '' ? undefined : term;
  updateApiParameterValue('searchfilter', value);
};
</script>
