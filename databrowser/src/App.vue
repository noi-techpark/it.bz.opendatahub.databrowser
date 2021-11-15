<template>
  <ul>
    <li><router-link to="/">Go to Home</router-link></li>
    <li><router-link to="/about">Go to About</router-link></li>
    <li><router-link to="/error">Go to Error</router-link></li>
  </ul>
  <AppLayout>
    <router-view></router-view>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
</script>
