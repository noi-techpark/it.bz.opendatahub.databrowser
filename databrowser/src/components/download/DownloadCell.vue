<template>
  <div
    class="
      inline-flex
      items-center
      py-3
      px-5
      space-x-10
      max-w-xl
      rounded-xl
      border border-gray-300
    "
  >
    <div class="inline-flex flex-col break-all">
      <slot></slot>
    </div>
    <button class="p-4 rounded-xl border border-gray-300">Icon</button>
  </div>
</template>
