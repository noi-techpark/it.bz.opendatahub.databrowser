<template>
  <header
    class="flex flex-row justify-between mx-3 md:mx-auto w-full max-w-5xl h-20"
  >
    <router-link to="/">
      <img
        src="/logo-open-data-hub-black.png"
        :alt="$t('header.logo')"
        class="mt-5 logo"
      />
    </router-link>
    <UserAuthentication />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import UserAuthentication from '../../domain/auth/UserAuthentication.vue';

export default defineComponent({
  components: { UserAuthentication },
});
</script>

<style>
header {
  height: 80px;
}

.logo {
  width: 73px;
  height: 27px;
}

@screen md {
  .logo {
    width: 100px;
    height: 37px;
  }
}
</style>
