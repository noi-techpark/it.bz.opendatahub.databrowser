<template>
  <footer class="px-3 lg:px-0 pt-6 pb-7 lg:pb-7 mx-auto w-full max-w-5xl">
    <ul
      class="
        justify-center
        lg:justify-start
        text-sm
        leading-none
        flex flex-wrap
        divide-x divide-current
      "
    >
      <li class="pr-4 my-1">@ Open Data Hub</li>
      <li class="px-4 my-1">
        <router-link to="/sitemap">{{ $t('footer.sitemap') }}</router-link>
      </li>
      <li class="px-4 my-1">
        <router-link to="/legal">{{ $t('footer.legal') }}</router-link>
      </li>
      <li class="px-4 my-1">
        <router-link to="/privacy">{{ $t('footer.privacy') }}</router-link>
      </li>
      <li class="pl-4 my-1">
        <router-link to="/imprint">{{ $t('footer.imprint') }}</router-link>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({});
</script>
