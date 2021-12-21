<template>
  <footer>
    <ContentArea
      class="pt-6 lg:pt-7 pb-6 lg:pb-7 mt-6 lg:mt-7 border-t border-gray-200"
    >
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
    </ContentArea>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import ContentArea from '../components/content/ContentArea.vue';

export default defineComponent({
  components: { ContentArea },
});
</script>
