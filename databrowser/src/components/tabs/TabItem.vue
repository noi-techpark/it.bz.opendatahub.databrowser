<template>
  <Tab v-slot="{ selected }">
    <ButtonPill :active="selected">
      <slot />
    </ButtonPill>
  </Tab>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import { Tab } from '@headlessui/vue';
import ButtonPill from '../button/ButtonPill.vue';

export default defineComponent({
  components: { ButtonPill, Tab },
});
</script>
