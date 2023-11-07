<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <UseFullscreen
    v-slot="{ toggle, isFullscreen }"
    class="flex flex-col items-center justify-center md:items-stretch"
  >
    <button @click="toggle">Toggle fullscreen</button>
    <ToolBoxPanel
      class="overflow-auto border-transparent bg-green-500 pl-2"
      :class="{ 'bg-red-500': !editStore.isEqual }"
    >
      <div :class="{ 'h-[30rem] w-default': !isFullscreen }">
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
  </UseFullscreen>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import 'vue-diff/dist/index.css';
import UseFullscreen from '../../../../components/fullscreen/UseFullscreen.vue';
import ToolBoxPanel from '../../toolBox/ToolBoxPanel.vue';
import { useEditStore } from '../store/editStore';

const VueDiff = defineAsyncComponent(() =>
  import('vue-diff').then((exports) => exports.Diff)
);

const editStore = useEditStore();
</script>
