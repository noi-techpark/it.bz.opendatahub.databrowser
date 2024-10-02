<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom
    variant="ghost"
    class="flex h-9 w-12 items-center justify-center border-none bg-gray-50 !px-0 md:hidden"
    @click="emit('open', true)"
  >
    <IconSearch />
  </ButtonCustom>
</template>

<script setup lang="ts">
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import IconSearch from '../../../../components/svg/IconSearch.vue';

const emit = defineEmits(['open']);
</script>
