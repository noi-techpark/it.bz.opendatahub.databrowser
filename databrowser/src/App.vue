<template>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
  <VueQueryDevTools />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useQueryProvider } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';

import AppLayout from './layouts/AppLayout.vue';

export default defineComponent({
  name: 'App',
  components: { AppLayout, VueQueryDevTools },
  setup() {
    useQueryProvider({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  },
});
</script>
