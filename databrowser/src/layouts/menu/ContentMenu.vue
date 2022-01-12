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
          :items="content"
          :title="$t('header.menu.allDatasets')"
          @select-category="changeFirstSubMenu"
        />
        <ContentMenuSubList
          v-if="fistSubMenu"
          :items="fistSubMenu.categories ?? []"
          :title="fistSubMenu.label"
          @select-category="changeSecoundSubMenu"
        />
        <ContentMenuSubList
          v-if="secoundSubMenu"
          :items="secoundSubMenu.categories ?? []"
          :title="secoundSubMenu.label"
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
        v-if="secoundSubMenu"
        :items="secoundSubMenu.categories ?? []"
        :title="secoundSubMenu.label"
        show-arrow
        @arrow-back="secoundSubMenu = undefined"
        @close-dialog="closeDialog"
      />
      <ContentMenuSubList
        v-else-if="fistSubMenu"
        :items="fistSubMenu.categories ?? []"
        :title="fistSubMenu.label"
        show-arrow
        @select-category="changeSecoundSubMenu"
        @arrow-back="fistSubMenu = undefined"
        @close-dialog="closeDialog"
      />
      <ContentMenuSubList
        v-else
        :items="content"
        :title="$t('header.menu.allDatasets')"
        @select-category="changeFirstSubMenu"
        @close-dialog="closeDialog"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { ref } from 'vue';
import ContentMenuSubList, { MenuItem } from './ContentMenuSubList.vue';
import IconClose from '../../components/svg/IconClose.vue';
import IconMenu from '../../components/svg/IconMenu.vue';

export default defineComponent({
  components: { IconMenu, IconClose, ContentMenuSubList },
  props: {
    content: {
      type: Array as PropType<Array<MenuItem>>,
      required: true,
    },
  },
  setup() {
    const fistSubMenu = ref<MenuItem>();
    const secoundSubMenu = ref<MenuItem>();
    const dialogOpen = ref<boolean>(false);

    function changeFirstSubMenu(menu: MenuItem) {
      secoundSubMenu.value = undefined;
      fistSubMenu.value = menu;
    }

    function changeSecoundSubMenu(menu: MenuItem) {
      secoundSubMenu.value = menu;
    }

    function closeDialog() {
      dialogOpen.value = false;
      fistSubMenu.value = undefined;
      secoundSubMenu.value = undefined;
    }

    return {
      dialogOpen,
      fistSubMenu,
      secoundSubMenu,
      closeDialog,
      changeFirstSubMenu,
      changeSecoundSubMenu,
    };
  },
});
</script>
