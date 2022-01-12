<template>
  <DatasetMenuSubList
    :items="data"
    title="All Datasets"
    @select-category="changeFirstSubMenu"
  />
  <DatasetMenuSubList
    v-if="fistSubMenu"
    :items="fistSubMenu.categories"
    :title="fistSubMenu.label"
    @select-category="changeSecoundSubMenu"
  />
  <DatasetMenuSubList
    v-if="secoundSubMenu"
    :items="secoundSubMenu.categories"
    :title="secoundSubMenu.label"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { ref } from 'vue';
import DatasetMenuSubList, { MenuItem } from './DatasetMenuSubList.vue';

export default defineComponent({
  components: { DatasetMenuSubList },
  setup() {
    const fistSubMenu = ref<MenuItem>();
    const secoundSubMenu = ref<MenuItem>();

    // Static data for testing only.
    // This block of data will be replaces with the generated data from the config
    const data: Array<MenuItem> = [
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
    ];

    function changeFirstSubMenu(menu: MenuItem) {
      secoundSubMenu.value = undefined;
      fistSubMenu.value = menu;
    }

    function changeSecoundSubMenu(menu: MenuItem) {
      secoundSubMenu.value = menu;
    }

    console.log(open);

    return {
      data,
      fistSubMenu,
      secoundSubMenu,
      changeFirstSubMenu,
      changeSecoundSubMenu,
    };
  },
});
</script>
