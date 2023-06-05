<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <SingleDatasetLayout :ignore-section-styling="true">
    <QuickView />
  </SingleDatasetLayout>
</template>

<script setup lang="ts">
import QuickView from '../../domain/datasets/quickView/QuickView.vue';
import SingleDatasetLayout from './SingleDatasetLayout.vue';
</script>
