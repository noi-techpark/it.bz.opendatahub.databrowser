<template>
  <footer>
    <ul class="flex links">
      <li>@ Open Data Hub</li>
      <li>
        <router-link to="sitemap">{{ $t('footer.sitemap') }}</router-link>
      </li>
      <li>
        <router-link to="legal">{{ $t('footer.legal') }}</router-link>
      </li>
      <li>
        <router-link to="privacy">{{ $t('footer.privacy') }}</router-link>
      </li>
      <li>
        <router-link to="imprint">{{ $t('footer.imprint') }}</router-link>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({});
</script>

<style>
.links li {
  @apply px-3;
}
</style>
