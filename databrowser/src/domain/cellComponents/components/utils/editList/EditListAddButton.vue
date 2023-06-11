<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom size="xs" class="flex h-6 items-center px-3 py-1">
    {{ text }}
  </ButtonCustom>
</template>

<script setup lang="ts">
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';

defineProps<{ text: string }>();
</script>
