<template>
  <div v-if="date != null">
    <span class="block">{{ formattedDistance }}</span>
    <span class="block text-gray-600">{{ formattedDate }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { format as formatFn, formatDistanceToNow } from 'date-fns';

export default defineComponent({
  props: {
    date: {
      default: () => null,
      type: String,
    },
    format: {
      default: () => null,
      type: String,
    },
  },
  computed: {
    formattedDate(): string {
      if (this.format == null) {
        return this.date;
      }
      if (this.date != null) {
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
