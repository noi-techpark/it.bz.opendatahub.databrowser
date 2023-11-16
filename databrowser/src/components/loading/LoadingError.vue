<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AlertError
    title="Error while loading data"
    :content="toErrorMessage(error)"
  />
</template>

<script setup lang="ts">
import { toErrorMessage } from '../../domain/utils/convertError';
import AlertError from '../alert/AlertError.vue';

defineProps<{ error: unknown }>();
</script>
