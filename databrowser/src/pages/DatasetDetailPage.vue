<template>
  <ContentArea>
    <TabGroup>
      <TabList
        class="flex relative py-7 space-x-4 border-t border-b border-gray-300"
      >
        <Tab>Table view</Tab>
        <Tab>Detail view</Tab>
        <Tab>Raw Data</Tab>
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
<script>
import ContentArea from '../components/content/ContentArea.vue';
import Tab from '../components/tabs/Tab.vue';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import LanguagePicker from '../components/languageSwitcher/LanguageFilter.vue';

export default {
  components: {
    LanguagePicker,
    ContentArea,
    TabGroup,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
  },
};
</script>
