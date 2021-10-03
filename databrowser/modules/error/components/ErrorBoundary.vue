<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import store from '../store';

export default Vue.extend({
  created() {
    const STORE_KEY = 'error';
    // eslint-disable-next-line no-underscore-dangle
    if (!this.$store.hasModule(STORE_KEY)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  errorCaptured(error: Error, vm: Vue, info: string): boolean | void {
    // Progress bar error
    this.$nuxt.$loading.fail != null && this.$nuxt.$loading.fail();
    setTimeout(this.$nuxt.$loading.finish, 500);

    // eslint-disable-next-line no-console
    console.error('ErrorBoundary: unhandled error captured', error, vm, info);

    // Add error to error handler
    this.$errorHandler.addError(error);

    return false;
  },
});
</script>
