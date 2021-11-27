<!--
    This component implements the dynamic layout loading behavior.
 -->
<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { markRaw, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppLayoutDefault from './AppLayoutDefault.vue';

export default {
  name: 'AppLayout',
  setup() {
    const layout = shallowRef(markRaw(AppLayoutDefault));
    const route = useRoute();

    watch(
      () => route.meta,
      async (meta) => {
        try {
          if (meta.layout == null || meta.layout === 'AppLayout') {
            // Use default layout if route defines no layout at all or if the layout is
            // defined to be this component itself, which could lead to unexpected behaviour
            layout.value = AppLayoutDefault;
          } else {
            // Try to load layout as defined by route
            //
            // Note that we prepend the path with '../layouts' which targets the current directory.
            // The import './' does not work because of Rollup compiler limitations
            // (see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations)

            const layoutComponent = await import(
              `../layouts/${meta.layout}.vue`
            );
            layout.value = layoutComponent?.default || AppLayoutDefault;
          }
        } catch (err) {
          // Use default layout on error, e.g. if a layout could not be loaded
          console.error(`Unable to load layout ${meta.layout}`, err);
          layout.value = AppLayoutDefault;
        }
      },
      { immediate: true }
    );
    return { layout };
  },
};
</script>
