<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    alt: {
      required: false,
      default: null,
      type: String,
    },
    src: {
      required: false,
      default: null,
      type: String,
    },
  },
  template: `
    <img v-if="src != null" :src="src" :alt="alt" style="width:100%"/>
  `,
});
</script>
