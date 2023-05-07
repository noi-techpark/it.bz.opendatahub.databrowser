<template>
  <h3
    class="font-semibold text-gray-500"
    :class="{ 'mt-5': marginTop, 'mb-4': marginBottom }"
  >
    <slot></slot>
  </h3>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ marginTop?: boolean; marginBottom?: boolean }>(), {
  marginTop: false,
  marginBottom: true,
});
</script>
