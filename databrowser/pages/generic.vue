<template>
  <div>
    <!-- Main content header -->
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
      <h1 class="text-2xl font-semibold whitespace-nowrap">Generic Browser</h1>
    </div>

    <GenericBrowser />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GenericBrowser from '~/modules/generic-renderer/components/GenericBrowser.vue';

export default Vue.extend({
  components: { GenericBrowser },
});
</script>
