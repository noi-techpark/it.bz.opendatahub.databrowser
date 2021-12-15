<template>
  <Header>
    <HeaderTitle>All POIs</HeaderTitle>
    <HeaderSubTitle
      >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
    </HeaderSubTitle>

    <InternalLink to="/" tone="primary"
      ><span>More information</span></InternalLink
    >
  </Header>

  <ContentArea class="flex flex-col h-full">
    <TabGroup>
      <TabList class="flex relative pb-10 space-x-4 border-b border-gray-300">
        <TabItem>Table view</TabItem>
        <TabItem>Detail view</TabItem>
        <TabItem>Raw Data</TabItem>
        <div class="absolute right-0">
          <LanguagePicker />
        </div>
      </TabList>
      <TabPanels class="overflow-hidden">
        <TabPanel class="flex flex-col h-full">
          <DatasetList></DatasetList>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </ContentArea>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import HeaderTitle from '../components/header/HeaderTitle.vue';
import HeaderSubTitle from '../components/header/HeaderSubTitle.vue';
import ContentArea from '../components/content/ContentArea.vue';
import InternalLink from '../components/link/InternalLink.vue';
import Header from '../components/header/HeaderContainer.vue';
import DatasetList from './datasets/List.vue';
import TabItem from '../components/tabs/TabItem.vue';
import LanguagePicker from '../components/languageSwitcher/LanguagePicker.vue';

export default defineComponent({
  components: {
    HeaderTitle,
    HeaderSubTitle,
    ContentArea,
    InternalLink,
    Header,
    DatasetList,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TabItem,
    LanguagePicker,
  },
});
</script>
