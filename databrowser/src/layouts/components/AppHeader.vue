<template>
  <header>
    <router-link to="/">
      <img
        src="/logo-open-data-hub-black.png"
        :alt="$t('header.logo')"
        class="logo"
      />
    </router-link>
    <LanguageSwitcher></LanguageSwitcher>
    <UserAuthentication />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import LanguageSwitcher from '../../components/language-switcher/LanguageSwitcher.vue';
import UserAuthentication from '../../domain/auth/UserAuthentication.vue';

export default defineComponent({
  components: { UserAuthentication, LanguageSwitcher },
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
