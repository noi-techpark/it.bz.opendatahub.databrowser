<template>
  <div>
    <EditListTabHeader :items="itemsInternal" :active-tab="activeTab">
      <template #tabLabel="{ item, index }">
        <slot name="tabLabel" :item="item" :index="index"></slot>
      </template>
      <template #addItems>
        <slot name="addItems"></slot>
      </template>
    </EditListTabHeader>
    <EditListTabBody
      v-if="itemsInternal[activeTab] != null"
      class="mt-5"
      :item="itemsInternal[activeTab]"
      :active-tab="activeTab"
    >
      <template #default="{ item, index }">
        <slot name="body" :item="item" :index="index"></slot>
      </template>
    </EditListTabBody>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, watch } from 'vue';
import { useInjectNavigation } from '../actions/useNavigation';
import EditListTabBody from './EditListTabBody.vue';
import EditListTabHeader from './EditListTabHeader.vue';

const props = defineProps<{ items: unknown[] | null }>();

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
