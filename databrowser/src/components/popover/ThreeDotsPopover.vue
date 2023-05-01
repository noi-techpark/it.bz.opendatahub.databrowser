<template>
  <PopoverCustom class="relative">
    <template #trigger>
      <PopoverCustomButton
        v-slot="{ open }"
        class="flex h-6 w-6 items-center justify-center rounded border text-green-500 hover:border-green-500 hover:bg-green-500/10 focus-visible:bg-green-500/10"
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
</script>
