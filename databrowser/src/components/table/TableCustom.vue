<template>
  <div class="overflow-y-auto flex-1">
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
.data-table th,
.data-table td {
  @apply border;
}
.data-table tbody tr {
  @apply align-top;
}
</style>
