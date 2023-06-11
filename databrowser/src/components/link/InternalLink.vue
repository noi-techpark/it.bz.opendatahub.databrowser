<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <router-link :to="to" :class="classNames"><slot></slot></router-link>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { Tone, Variant } from './types';
import { useClassNames } from './useClassNames';

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    tone?: Tone;
    variant?: Variant;
  }>(),
  {
    tone: 'primary',
    variant: 'underline',
  }
);

const { tone, variant } = toRefs(props);

const classNames = useClassNames(tone, variant);
</script>
