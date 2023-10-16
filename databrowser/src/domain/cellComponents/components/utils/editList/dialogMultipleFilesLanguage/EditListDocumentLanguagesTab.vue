<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <EditListDocumentLanguagesTabHeader
      v-if="itemsInternal.length > 1"
      :items="itemsInternal"
      :active-tab="dialogStore.activeTab"
      @change-tab="dialogStore.setActiveTab($event)"
    />
    <EditListDocumentLanguagesTabBody
      v-if="itemsInternal[dialogStore.activeTab] != null"
      class="mt-5"
      :item="itemsInternal[dialogStore.activeTab].data"
      :active-tab="dialogStore.activeTab"
    >
      <template #default="{ item, index }">
        <slot name="body" :item="item" :index="index"></slot>
      </template>
    </EditListDocumentLanguagesTabBody>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EditListDocumentLanguagesTabBody from './EditListDocumentLanguagesTabBody.vue';
import EditListDocumentLanguagesTabHeader from './EditListDocumentLanguagesTabHeader.vue';
import { MultipleFilesLanguages } from './types';
import { useDialogStore } from './dialogStore';

const props = defineProps<{
  items: MultipleFilesLanguages | null;
}>();

const itemsInternal = computed(() => props.items ?? []);

const dialogStore = useDialogStore();
</script>
