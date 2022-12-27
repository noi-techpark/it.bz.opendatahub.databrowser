<template>
  <ButtonCustom
    variant="ghost"
    size="xs"
    class="mr-2 flex h-6 items-center bg-white py-1 px-3 md:mr-9"
  >
    <IconStrokedArrowDown class="mr-1 -ml-1 h-5 w-5 rotate-90 stroke-current" />
    <span class="line-height-1">{{ label }}</span>
  </ButtonCustom>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import IconStrokedArrowDown from '../../../../../components/svg/IconStrokedArrowDown.vue';

defineProps<{ label: string }>();
</script>
