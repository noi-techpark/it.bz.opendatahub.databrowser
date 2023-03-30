<template>
  <ContentAlignmentX>
    <ContentDivider />
    <footer class="my-3 flex items-center lg:justify-center">
      <ul
        class="flex flex-wrap justify-center divide-x divide-current text-sm leading-none lg:justify-start"
      >
        <li class="my-1 pr-4">@ Open Data Hub</li>
        <li class="my-1 px-4">
          <ExternalLink
            href="https://noi.bz.it/en/privacy-cookie-policy"
            tone="text"
          >
            {{ t('footer.privacy') }}
          </ExternalLink>
        </li>
        <li class="my-1 pl-4">
          <ExternalLink
            href="https://noi.bz.it/en/privacy-cookie-policy"
            tone="text"
          >
            {{ t('footer.imprint') }}
          </ExternalLink>
        </li>
      </ul>
    </footer>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import { useI18n } from 'vue-i18n';
import ExternalLink from '../components/link/ExternalLink.vue';

const { t } = useI18n();
</script>
