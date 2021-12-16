<template>
  <div
    class="
      inline-flex
      justify-between
      sm:items-center
      py-3
      px-5
      space-x-5
      rounded-xl
      border border-gray-300
    "
  >
    <div class="inline-flex flex-col justify-center break-all">
      <span class="font-semibold whitespace-nowrap">{{ title }}</span>
      <span class="font-mono text-xs text-gray-900">{{ subTitle }}</span>
    </div>
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
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
};
</script>
