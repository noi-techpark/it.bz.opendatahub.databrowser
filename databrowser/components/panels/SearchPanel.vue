<template>
  <PanelsPanel :show="show" title="Search" @close="close">
    <div
      class="
        flex-1
        max-h-full
        p-4
        space-y-4
        overflow-hidden
        hover:overflow-y-auto
      "
    >
      <form action="#">
        <input
          type="text"
          placeholder="Search..."
          class="
            w-full
            px-4
            py-2
            border
            rounded-md
            focus:outline-none focus:ring
          "
        />
      </form>

      <div>
        <!-- Search panel content -->
      </div>
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
    left: {
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
