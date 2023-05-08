<template>
  <ToolBoxPanel
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
  </ToolBoxPanel>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import 'vue-diff/dist/index.css';
import ToolBoxPanel from '../../toolBox/ToolBoxPanel.vue';
import { useEditStore } from '../store/editStore';

const VueDiff = defineAsyncComponent(() =>
  import('vue-diff').then((exports) => exports.Diff)
);

const editStore = useEditStore();
</script>
