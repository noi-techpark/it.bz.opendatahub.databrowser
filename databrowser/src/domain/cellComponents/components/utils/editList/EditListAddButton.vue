<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom size="xs" class="flex h-6 items-center py-1 px-3">
    {{ text }}
  </ButtonCustom>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';

defineProps<{ text: string }>();
</script>
