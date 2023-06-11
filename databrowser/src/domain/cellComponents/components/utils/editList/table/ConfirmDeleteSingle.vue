<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col items-center justify-center">
    <span class="text-black">Are you sure you want to delete this item?</span>
    <div class="mt-3 flex gap-2">
      <ButtonCustom size="xs" class="py-1 px-2" @click="emit('confirm')">
        Yes, delete it
      </ButtonCustom>
      <ButtonCustom
        size="xs"
        variant="ghost"
        class="border-black py-1 px-2 text-black"
        @click="emit('abort')"
      >
        No, don't delete it
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';

const emit = defineEmits(['abort', 'confirm']);
</script>
