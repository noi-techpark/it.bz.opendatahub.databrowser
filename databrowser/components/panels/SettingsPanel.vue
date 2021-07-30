<template>
  <PanelsPanel :show="show" title="Settings" @close="close">
    <div class="flex-1 max-h-full p-4 overflow-hidden hover:overflow-y-auto">
      <span>Settings Content</span>
      <databrowser-example
        :user.prop="user"
        title="Static example user data for <databrowser-example> Web Component"
      ></databrowser-example>
      <!-- Settings Panel Content ... -->
    </div>
  </PanelsPanel>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserType } from '@wc/databrowser-example';

const user: UserType = { age: 23, name: 'John Doe' };

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { user };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
