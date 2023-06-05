<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <router-view></router-view>
  <VueQueryDevTools />
</template>

<script setup lang="ts">
import { useQueryProvider } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';

useQueryProvider({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
</script>

<style>
@font-face {
  font-family: 'SourceSansPro';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'SourceSansPro';
  font-weight: 600;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-SemiBold.ttf') format('truetype');
}

@font-face {
  font-family: 'SourceSansPro';
  font-weight: 700;
  font-style: normal;
  font-display: auto;
  src: url('/fonts/SourceSansPro-Bold.ttf') format('truetype');
}
</style>
