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

<style>
@font-face {
  font-family: 'SourceSansPro';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'SourceSansPro';
  font-weight: 600;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-SemiBold.ttf') format('truetype');
}

@font-face {
  font-family: 'SourceSansPro';
  font-weight: 700;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-Bold.ttf') format('truetype');
}
</style>
