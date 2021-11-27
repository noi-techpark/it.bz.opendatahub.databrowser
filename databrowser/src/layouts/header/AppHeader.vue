<template>
  <header>
    <router-link to="/" class="text-2xl">OPENDATAHUB!</router-link>
    <LanguageSwitcher></LanguageSwitcher>
    <UserAuthentication />
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import LanguageSwitcher from '../../components/languageSwitcher/LanguageSwitcher.vue';
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
