<template>
  <PanelsPanel :show="show" title="Settings" @close="close">
    <div class="flex-1 max-h-full p-4 overflow-hidden hover:overflow-y-auto">
      <span>Settings Content</span>
      <databrowser-example></databrowser-example>
      <!-- Settings Panel Content ... -->
    </div>
  </PanelsPanel>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
