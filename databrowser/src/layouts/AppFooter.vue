<template>
  <ContentAlignmentX>
    <ContentDivider />
    <ContentAlignmentY>
      <footer>
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
    </ContentAlignmentY>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import ContentAlignmentY from '../components/content/ContentAlignmentY.vue';
</script>
