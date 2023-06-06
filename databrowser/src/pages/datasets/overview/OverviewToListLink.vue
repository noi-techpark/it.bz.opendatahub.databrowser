<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <InternalLink
    :to="{ name: 'OverviewListPage' }"
    variant="no-underline"
    class="inline-flex items-center pr-2"
  >
    <IconStrokedArrowDown class="h-5 w-5 rotate-90 stroke-current" />
    {{ t('overview.detailPage.toOverview') }}
  </InternalLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import InternalLink from '../../../components/link/InternalLink.vue';
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';

const { t } = useI18n();
</script>
