<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <section v-if="!hide" class="bg-gray-50">
    <ContentAlignmentX
      class="relative m-auto flex flex-col items-start py-8 xl:w-default"
    >
      <div class="flex w-full flex-col gap-3">
        <div class="flex flex-col gap-1">
          <div class="flex items-center justify-between gap-4">
            <h1 class="text-2xl font-semibold leading-tight md:text-3xl">
              {{ $t('overview.listPage.heroTitle') }}
            </h1>
            <DisclaimerCloseHeroPopup @close="onHide" />
          </div>
          <h2 class="text-base font-normal text-dialog md:text-xl">
            {{ $t('overview.listPage.heroSubtitle') }}
          </h2>
        </div>
        <ButtonLink class="w-fit !px-3 uppercase" to="/about">
          {{ $t('overview.listPage.heroMoreInfo') }}
        </ButtonLink>
      </div>
    </ContentAlignmentX>
  </section>
</template>

<script setup lang="ts">
import ButtonLink from '../../../components/button/ButtonLink.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import { useLocalStorage } from '@vueuse/core';
import DisclaimerCloseHeroPopup from './DisclaimerCloseHeroPopup.vue';

const hide = useLocalStorage('opendatahub-hide-hero', false);

const onHide = () => {
  hide.value = true;
};
</script>
