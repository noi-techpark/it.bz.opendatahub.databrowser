<template>
  <header class="bg-gray-100">
    <ContentArea class="flex flex-col items-start pt-6 pb-8 lg:pb-10">
      <slot></slot>
    </ContentArea>
  </header>
</template>

<script lang="ts">
import ContentArea from '../content/ContentArea.vue';

export default {
  components: { ContentArea },
};
</script>
