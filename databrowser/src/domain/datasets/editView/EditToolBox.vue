<template>
  <ToolBox :is-table-view="false" :tab-names="['Export datasets', 'JSON diff']">
    <TabPanel>
      <ToolBoxCardHeader :margin-top="false">{{
        t('datasets.editView.toolbox.goodToKnow')
      }}</ToolBoxCardHeader>
      <ToolBoxCard :label="t('datasets.editView.toolbox.label.header')">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="t('datasets.editView.toolbox.label.body')"> </span>
      </ToolBoxCard>
      <ToolBoxCard :label="t('datasets.editView.toolbox.obligatory.header')">
        <span>{{ t('datasets.editView.toolbox.obligatory.body') }}</span>
      </ToolBoxCard>
    </TabPanel>
    <TabPanel
      class="overflow-auto pl-2 bg-green-500 border-transparent"
      :class="{ 'bg-red-500': !editStore.isEqual }"
    >
      <div class="w-[80rem] h-[30rem]">
        <VueDiff
          :mode="'split'"
          :theme="'dark'"
          :language="'json'"
          :prev="editStore.initialAsJson"
          :current="editStore.currentAsJson"
          :input-delay="10"
        />
      </div>
    </TabPanel>
  </ToolBox>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ToolBox from '../toolbox/ToolBox.vue';
import { TabPanel } from '@headlessui/vue';
import ToolBoxCardHeader from '../toolbox/ToolBoxCardHeader.vue';
import ToolBoxCard from '../toolbox/ToolBoxCard.vue';
import { useEditStore } from './store/editStore';

const { t } = useI18n();

const editStore = useEditStore();
</script>
