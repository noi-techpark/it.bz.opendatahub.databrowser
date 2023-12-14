<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonLink
    :to="newViewPath"
    size="xs"
    class="flex h-6 items-center px-3 py-1"
  >
    {{ t('datasets.header.addRecord') }}
  </ButtonLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../../components/button/ButtonLink.vue';
import { usePathsForCurrentRoute } from './usePaths';

const { t } = useI18n();

const { newViewPath } = usePathsForCurrentRoute();
</script>
