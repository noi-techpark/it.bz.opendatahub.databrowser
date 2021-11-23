<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';
import { PropType } from 'vue';

export default defineCustomElement({
  props: {
    data: {
      required: false,
      default: null,
      type: Object as PropType<{ text: string }>,
    },
  },
  render() {
    return this.data.text;
  },
});
</script>
