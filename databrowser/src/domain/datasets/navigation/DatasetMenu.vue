<template>
  <DatasetMenuItem v-for="item in data" :key="item.label" :item="item" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import DatasetMenuItem, { MenuItem } from './DatasetMenuItem.vue';

export default defineComponent({
  components: { DatasetMenuItem },
  setup() {
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
            url: 'http://example.com',
          },
        ],
      },
      {
        label: 'Activities',
        url: 'http://example.com',
      },
    ];

    return { data };
  },
});
</script>
