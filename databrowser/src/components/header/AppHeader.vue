<template>
  <header>
    <router-link to="/" class="text-2xl">OPENDATAHUB!</router-link>
    <LanguageSwitcher></LanguageSwitcher>
    <user-authentication />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher.vue';
import UserAuthentication from '../../domain/auth/UserAuthentication.vue';

export default defineComponent({
  components: { UserAuthentication, LanguageSwitcher },
});
</script>

<style>
header {
  height: 80px;
}
</style>
