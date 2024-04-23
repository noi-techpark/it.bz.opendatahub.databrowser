<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditGpsPoint
    :title="title"
    :cta-icon="ctaIcon"
    :icons-active="iconsActive"
    @cta-click="$emit('ctaClick', $event)"
  >
    <div :class="{ 'p-4': !contentHasNoPadding }">
      <slot name="content"></slot>
    </div>
  </EditGpsPoint>
</template>

<script setup lang="ts">
import EditGpsPoint from './EditGpsPointBase.vue';

withDefaults(
  defineProps<{
    title?: string;
    contentHasNoPadding?: boolean;
    ctaIcon?: string | Array<string>;
    iconsActive?: Array<string>;
  }>(),
  {
    title: '',
    contentHasNoPadding: false,
    ctaIcon: '',
    iconsActive: () => [],
  }
);

defineEmits(['ctaClick']);
</script>
