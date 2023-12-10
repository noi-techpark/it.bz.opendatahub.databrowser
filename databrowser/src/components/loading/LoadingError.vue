<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AlertError
    title="Error while loading data"
    :content="toError(error).message"
  />
</template>

<script setup lang="ts">
import { toError } from '../../domain/utils/convertError';
import AlertError from '../alert/AlertError.vue';

defineProps<{ error: unknown }>();
</script>
