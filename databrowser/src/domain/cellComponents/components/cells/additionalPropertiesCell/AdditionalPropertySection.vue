<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <h3 class="my-2 font-bold">{{ label }}</h3>
    <ContentDivider class="my-2" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import ContentDivider from '../../../../../components/content/ContentDivider.vue';

defineProps<{ label: string }>();
</script>
