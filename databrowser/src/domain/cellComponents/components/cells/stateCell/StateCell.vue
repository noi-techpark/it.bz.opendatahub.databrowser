<template>
  <TagCustom
    v-if="state != null"
    :text="state === true ? 'Active' : 'Inactive'"
    :type="state === true ? 'blue' : 'red'"
    has-dot
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import TagCustom from '../../../../../components/tag/TagCustom.vue';

withDefaults(
  defineProps<{
    state?: boolean;
  }>(),
  {
    state: undefined,
  }
);
</script>
