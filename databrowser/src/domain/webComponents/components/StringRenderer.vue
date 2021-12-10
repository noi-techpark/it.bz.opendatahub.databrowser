<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    text: {
      required: false,
      default: null,
      type: String,
    },
  },
  template: `<span v-if="text != null">{{ text }}</span>`,
});
</script>
