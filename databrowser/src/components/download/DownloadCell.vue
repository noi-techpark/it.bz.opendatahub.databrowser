<template>
  <div
    class="
      inline-flex
      justify-between
      sm:items-center
      py-3
      px-5
      space-x-5
      md:space-x-10
      lg:max-w-xl
      rounded-xl
      border border-gray-300
    "
  >
    <div class="inline-flex flex-col justify-center break-all">
      <slot></slot>
    </div>
    <button
      class="
        inline-flex
        flex-shrink-0
        justify-center
        items-center
        w-12
        h-12
        text-green-400
        hover:bg-gray-100
        rounded-xl
        border border-gray-300
      "
      @click="$emit('actionClicked')"
    >
      <slot name="icon"></slot>
    </button>
  </div>
</template>

<script>
export default {
  emits: ['actionClicked'],
};
</script>
