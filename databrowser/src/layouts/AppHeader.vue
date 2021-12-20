<template>
  <div
    class="
      justify-between
      py-3
      lg:py-5
      px-3
      lg:px-0
      mx-auto
      w-full
      max-w-5xl
      flex flex-row
    "
  >
    <router-link to="/">
      <img
        src="/logo-open-data-hub-black.png"
        :alt="$t('header.logo')"
        class="logo"
      />
    </router-link>
    <MenuUserSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import MenuUserSection from '../domain/auth/MenuUserSection.vue';

export default defineComponent({
  components: { MenuUserSection },
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
