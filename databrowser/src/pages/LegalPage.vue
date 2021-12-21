<template>
  <AppLayout>
    <ContentAlignmentX>Legal Page</ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import { defineComponent } from '@vue/runtime-core';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';

export default defineComponent({
  components: { ContentAlignmentX, AppLayout },
});
</script>
