<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <SingleDatasetLayout>
    <RawView />
  </SingleDatasetLayout>
</template>

<script setup lang="ts">
import SingleDatasetLayout from './SingleDatasetLayout.vue';
import RawView from '../../domain/datasets/rawView/RawView.vue';
</script>
