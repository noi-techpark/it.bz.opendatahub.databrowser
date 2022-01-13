<template>
  <ContentAlignmentX class="flex flex-row justify-between py-3 lg:py-5">
    <div class="inline-flex flex-row-reverse md:flex-row items-center">
      <router-link to="/">
        <img
          :alt="$t('header.logo')"
          class="logo"
          src="/logo-open-data-hub-black.png"
        />
      </router-link>
      <div class="inline-flex items-center px-4 md:px-10">
        <ContentMenu :content="data" />
      </div>
    </div>
    <MenuUserSection />
  </ContentAlignmentX>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentMenu from './menu/ContentMenu.vue';
import { MenuCategory } from './menu/ContentMenuSubList.vue';
import MenuUserSection from '../domain/auth/MenuUserSection.vue';

export default defineComponent({
  components: { ContentMenu, ContentAlignmentX, MenuUserSection },
  setup() {
    // Static data for testing only.
    // This block of data will be replaces with the generated data from the config
    const data: MenuCategory = {
      label: 'Test',
      categories: [
        {
          label: 'Places',
          categories: [
            {
              label: 'Locations',
              categories: [
                {
                  label: 'Regions',
                  url: 'http://example.com',
                },
                {
                  label: 'Meta Regions',
                  url: 'http://example.com',
                },
              ],
            },
            {
              label: 'POIs',
              url: '/dataset/odh-activity-poi',
            },
          ],
        },
        {
          label: 'Test',
          categories: [
            {
              label: 'Sub Test A',
              categories: [
                {
                  label: 'Sub Sub Test A',
                  url: '/',
                },
                {
                  label: 'Sub Sub Test B',
                  url: '/',
                },
              ],
            },
            {
              label: 'Sub Test B',
              url: '/',
            },
          ],
        },
        {
          label: 'Activities',
          url: '/',
        },
      ],
    };

    return {
      data,
    };
  },
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
