<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="z-10 flex flex-col items-start justify-between gap-y-8 md:flex-row md:items-center"
  >
    <div
      class="flex flex-col items-start gap-x-5 gap-y-4 text-xl text-gray-900 md:flex-row md:items-center"
    >
      <HeaderLink to="/dataset-overview">
        {{ t('header.menu.datasets') }}
      </HeaderLink>
      <HeaderExternalLink
        href="https://github.com/noi-techpark/it.bz.opendatahub.databrowser/wiki"
      >
        {{ t('header.menu.howTo') }}
      </HeaderExternalLink>
      <HeaderExternalLink href="https://opendatahub.com/contact">
        {{ t('header.menu.contact') }}
      </HeaderExternalLink>
    </div>

    <MenuUserSection />
  </div>
</template>

<script lang="ts" setup>
import MenuUserSection from '../../domain/auth/MenuUserSection.vue';
import { useI18n } from 'vue-i18n';
import HeaderLink from '../../components/header/HeaderLink.vue';
import HeaderExternalLink from '../../components/header/HeaderExternalLink.vue';

const { t } = useI18n();
</script>
