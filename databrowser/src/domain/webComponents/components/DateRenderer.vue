<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    date: {
      required: false,
      default: null,
      type: String,
    },
  },
  template: `
    <span v-if="date != null">{{ date }}</span>
  `,
});
</script>
