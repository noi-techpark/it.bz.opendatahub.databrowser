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
  render() {
    return JSON.stringify(this.data);
  },
});
</script>
