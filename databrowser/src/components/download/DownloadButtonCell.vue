<template>
  <DownloadCell :sub-title="subTitle" :title="title">
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
  </DownloadCell>
</template>

<script>
import DownloadCell from './DownloadCell.vue';

export default {
  components: { DownloadCell },
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
  emits: ['clicked'],
};
</script>
