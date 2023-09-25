<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <EditListDocumentLanguagesTabHeader
      :items="itemsInternal"
      :active-tab="activeTab"
    />
    <EditListTabBody
      v-if="itemsInternal[activeTab] != null"
      class="mt-5"
      :item="itemsInternal[activeTab].data"
      :active-tab="activeTab"
    >
      <template #default="{ item, index }">
        <slot name="body" :item="item" :index="index"></slot>
      </template>
    </EditListTabBody>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useInjectNavigation } from '../actions/useNavigation';
import EditListTabBody from './EditListTabBody.vue';
import EditListDocumentLanguagesTabHeader from './EditListDocumentLanguagesTabHeader.vue';
import { MultipleFilesLanguages } from './types';

const props = defineProps<{
  items: MultipleFilesLanguages | null;
}>();

const itemsInternal = computed(() => props.items ?? []);

const { activeTab, navigateToTab } = useInjectNavigation();

watch(
  () => itemsInternal.value,
  (items) => {
    // Ensure that navigation.activeTab is always in bounds
    // (may not be the case e.g. when last item in list is deleted)
    if (items != null && activeTab.value >= items.length) {
      navigateToTab(items.length - 1);
    }
  }
);
</script>
