<template>
  <ContentAlignmentX>
    <ContentDivider />
    <ContentAlignmentY>
      <footer>
        <ul
          class="flex flex-wrap justify-center text-sm leading-none divide-x divide-current lg:justify-start"
        >
          <li class="pr-4 my-1">@ Open Data Hub</li>
          <li class="px-4 my-1">
            <router-link to="/sitemap">{{ t('footer.sitemap') }}</router-link>
          </li>
          <li class="px-4 my-1">
            <router-link to="/legal">{{ t('footer.legal') }}</router-link>
          </li>
          <li class="px-4 my-1">
            <router-link to="/privacy">{{ t('footer.privacy') }}</router-link>
          </li>
          <li class="pl-4 my-1">
            <router-link to="/imprint">{{ t('footer.imprint') }}</router-link>
          </li>
        </ul>
      </footer>
    </ContentAlignmentY>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import ContentAlignmentY from '../components/content/ContentAlignmentY.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
