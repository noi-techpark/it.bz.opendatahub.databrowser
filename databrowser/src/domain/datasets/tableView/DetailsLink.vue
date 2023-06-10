<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonLink
    :to="to"
    variant="ghost"
    size="xs"
    class="flex h-10 w-11 flex-col items-center p-1"
  >
    <slot></slot>
  </ButtonLink>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import ButtonLink from '../../../components/button/ButtonLink.vue';

const props = defineProps<{ to: RouteLocationRaw }>();

const { to } = toRefs(props);
</script>
