<template>
  <div class="flex-1 overflow-y-auto">
    <table class="data-table">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.data-table {
  @apply w-full border-separate table-fixed;
  border-spacing: 0;
}
.data-table :deep(th),
.data-table :deep(td) {
  @apply border;
}
.data-table :deep(tbody tr) {
  @apply align-top;
}
</style>
