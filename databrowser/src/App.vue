<template>
  <ul>
    <li><router-link to="/">Go to Home</router-link></li>
    <li><router-link to="/about">Go to About</router-link></li>
    <li><router-link to="/axios-example">Go to Axios Example</router-link></li>
    <li><router-link to="/error">Go to Error</router-link></li>
  </ul>
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
    useQueryProvider();
  },
});
</script>
