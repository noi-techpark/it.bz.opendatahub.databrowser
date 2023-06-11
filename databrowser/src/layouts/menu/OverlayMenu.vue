<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <button
    v-if="dialogOpen"
    :title="t('header.menu.closeAction')"
    class="md:hidden"
    data-test="mobile-close-main-menu"
    @click="closeDialog"
  >
    <IconClose />
  </button>
  <button
    v-else
    :title="t('header.menu.openAction')"
    class="inline-flex space-x-4 rounded"
    data-test="open-main-menu"
    @click="dialogOpen = true"
  >
    <IconMenu />
    <span class="block">{{ t('header.menu.title') }}</span>
  </button>

  <Dialog
    :open="dialogOpen"
    class="fixed top-0 z-20 w-screen p-0"
    @close="closeDialog"
  >
    <DialogOverlay
      class="fixed inset-0 hidden bg-black opacity-30 md:block"
      @click="closeDialog"
    />
    <!-- Desktop Menu -->
    <div
      class="absolute top-0 left-0 hidden h-screen flex-col overflow-x-auto bg-white md:flex"
    >
      <button
        class="block p-4"
        data-test="desktop-close-main-menu"
        @click="closeDialog"
      >
        <IconClose />
      </button>
      <div class="inline-flex flex-1 divide-x-2">
        <OverlayMenuList
          v-for="(item, index) in navigation"
          :key="index"
          :item="item"
          @select-category="(menu) => addSubMenu(menu, index)"
          @close-dialog="closeDialog"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      class="absolute inset-x-0 top-16 h-screen border-t bg-white px-4 md:hidden"
    >
      <OverlayMenuList
        :item="lastElement"
        :show-arrow="navigation.length !== 1"
        @select-category="(menu) => addSubMenu(menu)"
        @arrow-back="removeLastSubMenu"
        @close-dialog="closeDialog"
      />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import OverlayMenuList, { MenuColumn } from './OverlayMenuList.vue';
import IconClose from '../../components/svg/IconClose.vue';
import IconMenu from '../../components/svg/IconMenu.vue';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  items: MenuColumn;
}>();

const navigation = ref<Array<MenuColumn>>([props.items]);
const dialogOpen = ref<boolean>(false);

function addSubMenu(menu: MenuColumn, index?: number) {
  if (index != undefined) {
    navigation.value.splice(index + 1);
  }

  navigation.value.push(menu);
}

function removeLastSubMenu() {
  navigation.value.pop();
}

function closeDialog() {
  dialogOpen.value = false;
  navigation.value = [props.items];
}

const lastElement = computed(
  () => navigation.value[navigation.value.length - 1]
);
</script>
