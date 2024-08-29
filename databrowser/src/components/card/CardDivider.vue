<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <hr class="h-px border-none bg-gray-300" :class="marginClasses" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  noBottom?: boolean;
  noTop?: boolean;
}>();

const marginClasses = computed(() => {
  const marginB = props.noBottom ? '' : 'mb-3';
  const marginT = props.noTop ? '' : 'mt-4';

  return `${marginB} ${marginT}`;
});
</script>
