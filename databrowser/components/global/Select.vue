<template>
  <select
    class="
      inline-flex
      items-center
      justify-center
      px-4
      py-2.5
      pr-10
      font-medium
      transition-colors
      rounded-md
      focus:outline-none focus:ring
    "
    @change="$emit('change', $event)"
  >
    <slot></slot>
  </select>
</template>
