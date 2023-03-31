<template>
  <HintCustom v-if="showEditHint" type="calm" title="Hint!" @close="hideHint">
    You can edit all data. Be aware that some data is synched from other
    sources. That’s why some of your changes may be overwritten. Check
    <ExternalLink
      href="https://opendatahub.readthedocs.io/en/latest/index.html"
      tone="white"
      >documentation</ExternalLink
    >
    or contact
    <ExternalLink href="mailto:support@opendatahub.com" tone="white">
      support@opendatahub.com</ExternalLink
    >
    for more info!
  </HintCustom>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import HintCustom from '../../../components/hint/HintCustom.vue';
import ExternalLink from '../../../components/link/ExternalLink.vue';

const showEditHint = useLocalStorage('showEditHint', true);

const hideHint = () => (showEditHint.value = false);
</script>
