<template>
  <ButtonCustom size="xs" class="flex items-center py-1 px-3 h-6">
    {{ text }}
  </ButtonCustom>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';

defineProps<{ text: string }>();
</script>
