<script lang="ts">
import { PropType } from '@vue/runtime-core';
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    data: {
      required: false,
      default: null,
      type: Object as PropType<{ title?: string; subtitle?: string }>,
    },
    no: {
      required: false,
      default: null,
      type: String,
    },
    title: {
      required: false,
      default: null,
      type: String,
    },
    subtitle: {
      required: false,
      default: null,
      type: String,
    },
  },
  template: `
    <div v-if="title != null || subtitle != null">
      <div v-if="title != null"><strong>{{ title }}</strong></div>
      <div v-if="subtitle != null"><span>{{ subtitle }}</span></div>
    </div>
  `,
});
</script>
