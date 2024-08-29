<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom
    variant="ghost"
    class="!px-0 w-12 h-9 flex items-center justify-center md:hidden border-none bg-gray-50 ml-auto"
    @click="emit('open', true)"
  >
    <IconSearch />
  </ButtonCustom>
</template>

<script setup lang="ts">
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import IconSearch from '../../../../components/svg/IconSearch.vue';

const emit = defineEmits(['open']);

defineProps<{
  open?: boolean;
}>();
</script>
