<template>
  <button
    class="rounded text-green-500 outline-offset-1"
    @click="$emit('icon-click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineEmits(['icon-click']);
</script>

<style scoped>
:slotted(svg) {
  @apply h-5 w-5;
}
</style>
