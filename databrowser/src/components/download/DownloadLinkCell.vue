<template>
  <DownloadCell :sub-title="subTitle" :title="title">
    <a
      :download="filename"
      :href="url"
      class="
        inline-flex
        flex-shrink-0
        justify-center
        items-center
        w-full
        h-full
      "
    >
      <slot></slot>
    </a>
  </DownloadCell>
</template>

<script>
import DownloadCell from './DownloadCell.vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
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
    data: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const url = `data:text/json;charset=utf-8,${encodeURIComponent(
      props.data
    )}`;

    return {
      url,
    };
  },
});
</script>
