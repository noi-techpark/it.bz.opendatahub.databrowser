<template>
  <div
    class="
      inline-flex
      flex-shrink-0
      w-12
      h-12
      text-green-400
      hover:bg-gray-100
      rounded-xl
      border border-gray-300
    "
  >
    <button
      class="
        inline-flex
        flex-shrink-0
        justify-center
        items-center
        w-full
        h-full
      "
      @click="$emit('clicked')"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  emits: ['clicked'],
};
</script>
