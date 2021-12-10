<script lang="ts">
import { defineCustomElement } from '@vue/runtime-dom';
import { format as formatFn, formatDistanceToNow } from 'date-fns';

export default defineCustomElement({
  props: {
    date: {
      required: false,
      default: null,
      type: String,
    },
    format: {
      required: false,
      default: null,
      type: String,
    },
  },
  template: `
    <div v-if="date != null">
      <span style="display:block">{{ formattedDistance }}</span>
      <span style="display:block">{{ formattedDate }}</span>
    </div>`,
  computed: {
    formattedDate(): string {
      if (this.format == null) {
        return this.date;
      }
      if (this.date != null) {
        // return 'formatting ' + this.format + ', date: ' + this.date;
        return formatFn(Date.parse(this.date), this.format);
      }
      return '';
    },
    formattedDistance(): string {
      if (this.date != null) {
        return formatDistanceToNow(Date.parse(this.date), {
          addSuffix: true,
          includeSeconds: true,
        });
      }
      return '';
    },
  },
});
</script>
