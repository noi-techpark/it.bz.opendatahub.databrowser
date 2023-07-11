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
          Datasets
        </router-link>
      </HeaderButton>
      <HeaderButton>
        <ExternalLink href="/" variant="no-underline" tone="text">
          How to
        </ExternalLink>
      </HeaderButton>
      <HeaderButton>
        <ExternalLink
          href="https://opendatahub.com/contact"
          variant="no-underline"
          tone="text"
        >
          Contact
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
</script>
