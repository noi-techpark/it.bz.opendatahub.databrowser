<template>
  <span v-if="date != null">{{ formattedDate }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { format as formatFn } from 'date-fns';

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
  },
});
</script>
