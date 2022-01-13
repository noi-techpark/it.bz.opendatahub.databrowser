<template>
  <button v-if="dialogOpen" class="md:hidden" @click="closeDialog">
    <IconClose />
  </button>
  <button v-else class="inline-flex space-x-4" @click="dialogOpen = true">
    <IconMenu />
    <span class="hidden md:block">{{ $t('header.menu.title') }}</span>
  </button>

  <Dialog
    :open="dialogOpen"
    class="fixed top-0 z-20 p-0 w-screen"
    @close="closeDialog"
  >
    <DialogOverlay class="hidden md:block fixed inset-0 bg-black opacity-30" />
    <!-- Desktop Menu -->
    <div
      class="
        hidden
        md:block
        overflow-x-auto
        absolute
        top-0
        left-0
        h-screen
        bg-white
      "
    >
      <button class="block py-4 px-4" @click="closeDialog">
        <IconClose />
      </button>
      <div class="inline-flex flex-row h-full divide-x-2">
        <ContentMenuSubList
          v-for="(item, index) in navigation"
          :key="index"
          :item="item"
          @select-category="(menu) => addSubMenu(menu, index)"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      class="
        md:hidden
        absolute
        top-12
        right-0
        left-0
        px-4
        h-screen
        bg-white
        border-t
      "
    >
      <ContentMenuSubList
        :item="lastElement"
        :show-arrow="navigation.length !== 1"
        @select-category="(menu) => navigation.push(menu)"
        @arrow-back="removeLastSubMenu"
        @close-dialog="closeDialog"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { computed, ref } from 'vue';
import ContentMenuSubList, {
  MenuCategory,
  MenuLink,
} from './ContentMenuSubList.vue';
import IconClose from '../../components/svg/IconClose.vue';
import IconMenu from '../../components/svg/IconMenu.vue';
import { Dialog, DialogOverlay } from '@headlessui/vue';

export default defineComponent({
  components: {
    IconMenu,
    IconClose,
    ContentMenuSubList,
    Dialog,
    DialogOverlay,
  },
  props: {
    content: {
      type: Object as PropType<MenuCategory>,
      required: true,
    },
  },
  setup(props) {
    const navigation = ref<Array<MenuCategory | MenuLink>>([props.content]);
    const dialogOpen = ref<boolean>(false);

    function addSubMenu(menu: MenuCategory | MenuLink, index: number) {
      navigation.value.splice(index + 1);
      navigation.value.push(menu);
    }

    function removeLastSubMenu() {
      navigation.value.pop();
    }

    function closeDialog() {
      dialogOpen.value = false;
      navigation.value = [props.content];
    }

    const lastElement = computed(
      () => navigation.value[navigation.value.length - 1]
    );

    return {
      lastElement,
      navigation,
      dialogOpen,
      addSubMenu,
      closeDialog,
      removeLastSubMenu,
    };
  },
});
</script>
