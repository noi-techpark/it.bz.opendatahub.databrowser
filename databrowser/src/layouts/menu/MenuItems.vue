<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="flex flex-col items-start justify-between gap-y-8 lg:flex-row lg:items-center"
  >
    <div
      class="flex flex-col items-start gap-x-5 gap-y-4 lg:flex-row lg:items-center"
    >
      <HeaderButton>
        <router-link to="/dataset-overview" class="no-underline">
          {{ t('header.menu.datasets') }}
        </router-link>
      </HeaderButton>
      <HeaderButton>
        <ExternalLink
          class="flex items-center gap-2"
          href="https://github.com/noi-techpark/it.bz.opendatahub.databrowser/wiki"
          variant="no-underline"
          tone="text"
        >
          {{ t('header.menu.howTo') }}<IconExternal />
        </ExternalLink>
      </HeaderButton>
      <HeaderButton>
        <ExternalLink
          class="flex items-center gap-2"
          href="https://opendatahub.com/contact"
          variant="no-underline"
          tone="text"
        >
          {{ t('header.menu.contact') }}<IconExternal />
        </ExternalLink>
      </HeaderButton>
    </div>

    <MenuUserSection />
  </div>
</template>

<script lang="ts" setup>
import MenuUserSection from '../../domain/auth/MenuUserSection.vue';
import ExternalLink from '../../components/link/ExternalLink.vue';
import HeaderButton from '../../components/header/HeaderButton.vue';
import IconExternal from '../../components/svg/IconExternal.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
