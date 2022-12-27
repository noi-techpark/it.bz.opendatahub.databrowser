<template>
  <div class="flex flex-col justify-center items-center">
    <span class="text-black">Are you sure you want to delete this item?</span>
    <div class="flex gap-2 mt-3">
      <ButtonCustom size="xs" class="py-1 px-2" @click="emit('confirm')">
        Yes, delete it
      </ButtonCustom>
      <ButtonCustom
        size="xs"
        variant="ghost"
        class="py-1 px-2 text-black border-black"
        @click="emit('abort')"
      >
        No, don't delete it
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';

const emit = defineEmits(['abort', 'confirm']);
</script>
