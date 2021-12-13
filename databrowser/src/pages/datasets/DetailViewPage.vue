<template>
  <AppLayout>
    <ContentArea>
      <TabGroup>
        <TabList
          class="flex relative py-7 space-x-4 border-t border-b border-gray-300"
        >
          <TabItem>Table view</TabItem>
          <TabItem>Detail view</TabItem>
          <TabItem>Raw Data</TabItem>
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
  </AppLayout>
</template>

<script class="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import ContentArea from '../../components/content/ContentArea.vue';
import TabItem from '../../components/tabs/TabItem.vue';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import LanguagePicker from '../../components/languageSwitcher/LanguagePicker.vue';

export default {
  components: {
    AppLayout,
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
