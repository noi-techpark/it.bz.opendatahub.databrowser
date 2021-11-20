<template>
  <header>
    <router-link to="/" class="text-2xl">OPENDATAHUB!</router-link>
    <LanguageSwitcher></LanguageSwitcher>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher.vue';

export default defineComponent({
  components: { LanguageSwitcher },
});
</script>

<style>
header {
  height: 80px;
}
</style>
