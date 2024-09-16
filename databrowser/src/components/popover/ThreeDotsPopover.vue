<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverCustom class="relative">
    <template #trigger>
      <PopoverCustomButton
        v-slot="{ open }"
        class="flex h-6 w-6 items-center justify-center border"
        :class="[buttonClasses, large ? 'w-9 h-9' : '']"
      >
        <IconThreeDots
          class="fill-current transition-transform"
          :class="{ 'rotate-90': open }"
        />
      </PopoverCustomButton>
    </template>

    <template #container>
      <slot></slot>
    </template>
  </PopoverCustom>
</template>

<script setup lang="ts">
import PopoverCustomButton from './PopoverCustomButton.vue';
import IconThreeDots from '../svg/IconThreeDots.vue';
import PopoverCustom from './PopoverCustom.vue';
import { computeButtonClasses } from '../button/styles';
import { Size, Variant } from '../button/types';

const props = defineProps<{ large?: boolean }>();

const buttonClasses = computeButtonClasses({
  variant: Variant.ghost,
  size: Size.xs,
});
</script>
