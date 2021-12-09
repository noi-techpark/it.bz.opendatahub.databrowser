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
          <ButtonPillGroup
            :data="['DE', 'IT', 'EN', 'NL', 'CS', 'PL', 'FR', 'RU']"
            :initial-selected="initialSelected"
            default-selected="EN"
            @selected-change="changeLanguage"
          />
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
import ButtonPillGroup from '../components/button/ButtonPillGroup.vue';

export default {
  components: {
    ButtonPillGroup,
    ContentArea,
    TabGroup,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
  },
  computed: {
    initialSelected() {
      return this.$route.query.language ?? '';
    },
  },
  methods: {
    changeLanguage(language) {
      this.$router.replace({ query: { language } });
    },
  },
};
</script>
