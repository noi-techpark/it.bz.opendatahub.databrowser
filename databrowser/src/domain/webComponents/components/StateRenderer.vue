<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';

// TODO: maybe it qould be better to implement this component as ordinary Vue component?
export default defineCustomElement({
  props: {
    data: {
      required: false,
      default: null,
      type: Object,
    },
  },
  template: `
    <div v-if="data?.state != null">
      <span v-if="data.state === true" style="border:1px solid #3d95fc;padding:5px 20px;border-radius:9999px;background-color:rgba(61, 149, 252, 0.1);color:#3d95fc">Active</span>
      <span v-else style="border:1px solid #ff1957;padding:5px 20px;border-radius:9999px;background-color:rgba(255, 25, 87, 0.1);color:#ff1957">Not active</span>
    </div>
  `,
});
</script>
