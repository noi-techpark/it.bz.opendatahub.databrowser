<script lang="ts">
import { PropType } from '@vue/runtime-core';
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    data: {
      required: false,
      default: null,
      type: Object as PropType<{ items?: unknown[]; separator?: string }>,
    },
  },
  template: `
    <span v-if="data != null">{{ data?.items?.join(separator) }}</span>
  `,
  computed: {
    separator(): string {
      return this.data.separator ?? ' ';
    },
  },
});
</script>
