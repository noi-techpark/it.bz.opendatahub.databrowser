<template>
  <div class="flex flex-col h-full">
    <AppHeader />

    <user-authentication />

    <main class="overflow-auto flex-auto h-full">
      <router-view></router-view>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppHeader from '../components/header/AppHeader.vue';
import AppFooter from '../components/footer/AppFooter.vue';
import UserAuthentication from '../domain/auth/UserAuthentication.vue';

export default defineComponent({
  components: { AppHeader, AppFooter, UserAuthentication },
});
</script>
