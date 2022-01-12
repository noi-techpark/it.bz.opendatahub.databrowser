<template>
  <ContentAlignmentX class="flex flex-row justify-between py-3 lg:py-5">
    <div class="flex items-center space-x-16">
      <router-link to="/">
        <img
          :alt="$t('header.logo')"
          class="logo"
          src="/logo-open-data-hub-black.png"
        />
      </router-link>
      <MenuPopover />
    </div>
    <MenuUserSection />
  </ContentAlignmentX>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import MenuUserSection from '../domain/auth/MenuUserSection.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import MenuPopover from './menu/MenuPopover.vue';

export default defineComponent({
  components: { MenuPopover, ContentAlignmentX, MenuUserSection },
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
