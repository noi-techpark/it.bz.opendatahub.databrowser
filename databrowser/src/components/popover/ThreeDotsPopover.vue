<template>
  <PopoverCustom class="relative">
    <template #trigger>
      <PopoverCustomButton
        v-slot="{ open }"
        class="flex justify-center items-center w-6 h-6 text-green-500 focus:text-white hover:bg-green-500/10 focus:bg-green-500 rounded border hover:border-green-500"
      >
        <IconThreeDots
          class="transition-transform fill-current"
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
