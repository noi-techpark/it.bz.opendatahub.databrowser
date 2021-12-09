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
          <ButtonPill
            class="inline-flex md:hidden items-center"
            @click="showMobileSelect = true"
          >
            <span class="pr-2">{{ currentSelected }}</span>
            <ArrowDown />
          </ButtonPill>

          <ButtonPillGroup
            :data="suportedLanguages"
            :initial-selected="currentSelected"
            class="hidden md:inline-flex"
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
  <Dialog
    :open="showMobileSelect"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div class="relative py-3 w-full bg-white rounded-t">
        <div class="flex flex-col justify-center px-3 space-y-3 w-full">
          <button class="mx-auto" @click="closeDialog">
            <IconClose />
          </button>
          <ButtonPill
            v-for="language in suportedLanguages"
            :key="language"
            :class="[
              isSelected(language)
                ? 'text-green-500 bg-opacity-10 bg-green-500 border-green-500'
                : 'border-gray-500',
            ]"
            @click="changeLanguage(language)"
            >{{ language }}
          </ButtonPill>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script class="ts">
import ContentArea from '../components/content/ContentArea.vue';
import Tab from '../components/tabs/Tab.vue';
import {
  Dialog,
  DialogOverlay,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue';
import ButtonPillGroup from '../components/button/ButtonPillGroup.vue';
import ButtonPill from '../components/button/ButtonPill.vue';
import { FilterLanguage } from '../domain/api/configFilter.ts';
import ArrowDown from '../components/svg/ArrowDown.vue';
import IconClose from '../components/svg/IconClose.vue';

export default {
  components: {
    ButtonPillGroup,
    ContentArea,
    TabGroup,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Dialog,
    DialogOverlay,
    ButtonPill,
    IconClose,
    ArrowDown,
  },
  data() {
    return {
      suportedLanguages: Object.values(FilterLanguage),
      showMobileSelect: false,
    };
  },
  computed: {
    currentSelected() {
      const query = this.$route.query.language;

      return query != null && this.suportedLanguages.includes(query)
        ? query
        : FilterLanguage.EN;
    },
  },
  methods: {
    changeLanguage(language) {
      this.$router.replace({ query: { language } });
      this.closeDialog();
    },
    isSelected(current) {
      return this.currentSelected == current;
    },
    closeDialog() {
      this.showMobileSelect = false;
    },
  },
};
</script>
