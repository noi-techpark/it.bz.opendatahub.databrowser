<template>
  <ToolBox
    :is-table-view="true"
    :tab-names="['Search and filter', 'Export datasets']"
    :default-index="1"
  >
    <TabPanel>
      <ToolBoxCard label="Basic Search" :break-all="true" :is-filter="true">
        <template #icon>
          <TagCustom
            class="-mr-4 rounded-r-none font-normal"
            text="Feature coming soon!"
            type="calm"
          />
        </template>
        <template #default>
          <InputSearch
            class="opacity-50"
            :disabled="true"
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
import InputSearch from '../../../components/input/InputSearch.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import ExportDataset from '../toolbox/ExportDataset.vue';
import ToolBox from '../toolbox/ToolBox.vue';
import ToolBoxCard from '../toolbox/ToolBoxCard.vue';

defineProps<{ url: string }>();

const search = (term: string) => {
  console.log('search', term);
};
</script>
