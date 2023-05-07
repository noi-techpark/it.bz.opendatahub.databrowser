<template>
  <ToolBox :tab-names="['General', 'JSON diff']">
    <TabPanel>
      <ToolBoxSectionLabel>{{
        t('datasets.editView.toolbox.goodToKnow')
      }}</ToolBoxSectionLabel>
      <ToolBoxCard :label="t('datasets.editView.toolbox.label.header')">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="t('datasets.editView.toolbox.label.body')"> </span>
      </ToolBoxCard>
      <ToolBoxCard :label="t('datasets.editView.toolbox.obligatory.header')">
        <span>{{ t('datasets.editView.toolbox.obligatory.body') }}</span>
      </ToolBoxCard>
    </TabPanel>
    <TabPanel
      class="overflow-auto border-transparent bg-green-500 pl-2"
      :class="{ 'bg-red-500': !editStore.isEqual }"
    >
      <div class="h-[30rem] w-[80rem]">
        <VueDiff
          :mode="'split'"
          :theme="'dark'"
          :language="'json'"
          :prev="editStore.initialAsJson ?? ''"
          :current="editStore.currentAsJson ?? ''"
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
import ToolBoxSectionLabel from '../toolbox/ToolBoxSectionLabel.vue';
import ToolBoxCard from '../toolbox/ToolBoxCard.vue';
import { useEditStore } from './store/editStore';
import { defineAsyncComponent } from 'vue';
import 'vue-diff/dist/index.css';

const VueDiff = defineAsyncComponent(() =>
  import('vue-diff').then((exports) => exports.Diff)
);

const { t } = useI18n();

const editStore = useEditStore();
</script>
