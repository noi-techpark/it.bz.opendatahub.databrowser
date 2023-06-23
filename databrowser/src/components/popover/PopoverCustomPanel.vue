<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <PopoverPanel v-slot="{ open, close }" class="z-20">
      <div class="rounded bg-white shadow-md ring-1 ring-gray-400">
        <ButtonCustom
          v-if="hasCloseButton"
          :size="Size.xs"
          :variant="Variant.ghost"
          class="float-right m-2 border-none"
          @click="close"
        >
          <IconClose />
        </ButtonCustom>

        <slot :open="open" :close="close"></slot>
      </div>
    </PopoverPanel>
  </transition>
</template>

<script setup lang="ts">
import { PopoverPanel } from '@headlessui/vue';
import IconClose from '../svg/IconClose.vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { Size, Variant } from '../button/types';

withDefaults(defineProps<{ hasCloseButton?: boolean }>(), {
  hasCloseButton: true,
});
</script>
