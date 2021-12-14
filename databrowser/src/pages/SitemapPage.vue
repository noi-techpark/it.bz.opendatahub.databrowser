<template>
  <AppLayout>
    <ContentArea>Sitemap Page</ContentArea>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import { defineComponent } from '@vue/runtime-core';
import ContentArea from '../components/content/ContentArea.vue';

export default defineComponent({
  components: { ContentArea, AppLayout },
});
</script>
