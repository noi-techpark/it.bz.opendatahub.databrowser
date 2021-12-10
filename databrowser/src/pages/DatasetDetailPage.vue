<template>
  <ContentArea>
    <TabGroup>
      <TabList
        class="flex relative py-7 space-x-4 border-t border-b border-gray-300"
      >
        <TabItem>Table view</TabItem>
        <TabItem>Detail view</TabItem>
        <TabItemab>Raw Data</TabItemab>
        <div class="absolute right-0">
          <LanguagePicker />
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div>
            Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
            {{ $route.params.datasetId }})
          </div>
        </TabPanel>
        <TabPanel>Details</TabPanel>
        <TabPanel>Raw</TabPanel>
      </TabPanels>
    </TabGroup>
  </ContentArea>
</template>

<script class="ts">
import ContentArea from '../components/content/ContentArea.vue';
import TabItem from '../components/tabs/TabItem.vue';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import LanguagePicker from '../components/languageSwitcher/LanguagePicker.vue';

export default {
  components: {
    LanguagePicker,
    ContentArea,
    TabGroup,
    TabList,
    TabItem,
    TabPanel,
    TabPanels,
  },
};
</script>
