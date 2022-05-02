<template>
  <button
    v-if="dialogOpen"
    :title="$t('header.menu.closeAction')"
    class="md:hidden"
    @click="closeDialog"
  >
    <IconClose />
  </button>
  <button
    v-else
    :title="$t('header.menu.openAction')"
    class="inline-flex space-x-4 rounded"
    @click="dialogOpen = true"
  >
    <IconMenu />
    <span class="block">{{ $t('header.menu.title') }}</span>
  </button>

  <Dialog
    :open="dialogOpen"
    class="fixed top-0 z-20 p-0 w-screen"
    @close="closeDialog"
  >
    <DialogOverlay
      class="hidden fixed inset-0 bg-black opacity-30 md:block"
      @click="closeDialog"
    />
    <!-- Desktop Menu -->
    <div
      class="hidden overflow-x-auto absolute top-0 left-0 flex-col h-screen bg-white md:flex"
    >
      <button class="block p-4" @click="closeDialog">
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
      class="absolute inset-x-0 top-16 px-4 h-screen bg-white border-t md:hidden"
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
import { computed, defineProps, ref } from 'vue';
import OverlayMenuList, { MenuColumn } from './OverlayMenuList.vue';
import IconClose from '../../components/svg/IconClose.vue';
import IconMenu from '../../components/svg/IconMenu.vue';
import { Dialog } from '@headlessui/vue';

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
