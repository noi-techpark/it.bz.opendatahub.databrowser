<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AlertError
    title="Error while loading data"
    :content="toErrorString(error)"
  />
</template>

<script setup lang="ts">
import AlertError from '../alert/AlertError.vue';
import { toErrorString } from '../../domain/api/service/utils';

defineProps<{ error: unknown }>();
</script>
