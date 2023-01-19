<template>
  <div class="mt-2 mb-4">
    <div class="mb-3">
      <slot></slot>
    </div>
    <h2 v-if="editable" class="text-xl font-bold text-gray-900">
      Add one or more items and provide further details
    </h2>
  </div>
</template>

<script setup lang="ts">
import { useInjectEditMode } from '../actions/useEditMode';

const { editable } = useInjectEditMode();
</script>
