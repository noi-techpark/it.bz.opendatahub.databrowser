<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';

export default defineCustomElement({
  props: {
    data: {
      required: false,
      default: null,
      type: Object,
    },
  },
  template: `
    <span v-if="data != null">{{ JSON.stringify(this.data) }}</span>
  `,
});
</script>
