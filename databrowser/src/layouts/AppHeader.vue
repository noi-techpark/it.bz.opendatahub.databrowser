<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="sticky top-0 z-10 w-full">
    <div class="bg-gray-50">
      <ContentAlignmentX class="m-auto flex w-full gap-2 px-4 py-2">
        <TagCustom
          v-if="envBadge"
          class="text-sm"
          :type="envBadge == 'BETA' ? 'pink' : 'info'"
          :text="envBadge"
        />
        <div class="flex grow" />
        <ExternalLink
          href="https://opendatahub.com"
          variant="no-underline"
          tone="text"
          class="flex items-center gap-x-2 text-sm"
        >
          {{ t('header.presentedBy') }}
          <img
            :alt="t('header.logo')"
            class="aspect-square h-6"
            src="/logo-open-data-hub-black.svg"
          />
        </ExternalLink>
      </ContentAlignmentX>
    </div>
    <div class="bg-white">
      <ContentAlignmentX
        class="m-auto flex flex-col gap-x-20 gap-y-2 px-4 py-2 md:flex-row"
      >
        <div class="flex items-center">
          <InternalLink
            to="/"
            data-test="link-to-home-page"
            variant="no-underline"
          >
            <div class="flex">
              <img
                :alt="t('header.logo')"
                class="aspect-square h-12"
                src="/logo-open-data-hub-black.svg"
              />
              <div class="mx-2 w-px self-stretch bg-black"></div>
              <div
                class="h-full rounded border border-black px-2 py-1 text-lg font-semibold leading-5 text-black"
                v-html="t('header.toolBadge')"
              ></div>
            </div>
          </InternalLink>
          <IconClose
            v-if="props.isMenuOpen"
            class="ml-auto md:hidden"
            @click="toggleMenu"
          />
          <IconMenu v-else class="ml-auto md:hidden" @click="toggleMenu" />
        </div>

        <MenuItems
          :class="props.isMenuOpen ? '' : 'hidden'"
          class="grow border-t border-gray-250 py-4 md:flex md:border-0"
        />
      </ContentAlignmentX>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import { useI18n } from 'vue-i18n';
import TagCustom from '../components/tag/TagCustom.vue';
import ExternalLink from '../components/link/ExternalLink.vue';
import MenuItems from './menu/MenuItems.vue';
import IconMenu from '../components/svg/IconMenu.vue';
import IconClose from '../components/svg/IconClose.vue';
import InternalLink from '../components/link/InternalLink.vue';

const { t } = useI18n();

const props = defineProps<{
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  toggleMenu: [boolean];
}>();

const envBadge = import.meta.env.VITE_APP_ENV_BADGE;
const envBadgeColor = import.meta.env.VITE_APP_ENV_BADGE_COLOR;

function toggleMenu() {
  emit('toggleMenu', !props.isMenuOpen);
}
</script>
