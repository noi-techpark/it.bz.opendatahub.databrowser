<template>
  <div class="h-full">
    <div
      class="
        flex flex-col
        items-start
        justify-between
        pb-6
        space-y-4
        border-b
        lg:items-center lg:space-y-0 lg:flex-row
      "
    >
      <h1 class="text-2xl font-semibold whitespace-nowrap">Mobility</h1>
    </div>
    <iframe src="https://analytics.opendatahub.bz.it/" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({ middleware: 'auth' });
</script>

<style>
iframe {
  height: calc(100% - 60px);
  width: 100%;
}
</style>
