<template>
  <ContentAlignmentX class="flex flex-row justify-between py-3 lg:py-5">
    <router-link to="/">
      <img
        src="/logo-open-data-hub-black.png"
        :alt="$t('header.logo')"
        class="logo"
      />
    </router-link>
    <MenuUserSection />
  </ContentAlignmentX>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import MenuUserSection from '../domain/auth/MenuUserSection.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';

export default defineComponent({
  components: { ContentAlignmentX, MenuUserSection },
});
</script>

<style>
.logo {
  width: 73px;
  height: 27px;
}

@screen lg {
  .logo {
    width: 100px;
    height: 37px;
  }
}
</style>
