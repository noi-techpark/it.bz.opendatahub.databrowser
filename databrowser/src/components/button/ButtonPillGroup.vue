<template>
  <button
    class="
      inline-flex
      md:hidden
      items-center
      py-1
      px-4
      rounded-full
      border border-gray-500
    "
    @click="showMobileSelect = true"
  >
    <span class="pr-2">{{ selected }}</span>
    <ArrowDown />
  </button>
  <div class="hidden md:inline-flex">
    <div
      v-for="(item, index) in data"
      :key="item"
      :class="{
        'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
          isSelected(item),
        'hover:bg-gray-300': !isSelected(item),
        'rounded-l-full border-l': index == 0,
        'rounded-r-full border-r': index == data.length - 1,
      }"
      class="
        overflow-hidden
        last:pr-1
        first:pl-1
        border-t border-b border-gray-500
      "
    >
      <div
        :class="{
          'border-green-500': isSelected(item),
          'border-l': index != 0,
          'border-r': index != data.length - 1,
        }"
        class="border-transparent"
        role="button"
        tabindex="0"
        @click="changeSelectedItem(item)"
      >
        <span class="block py-1 px-2 font-semibold">{{ item }}</span>
      </div>
    </div>
  </div>
  <Dialog
    :open="showMobileSelect"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div class="relative py-3 w-full bg-white rounded-t">
        <div class="flex flex-col justify-center px-3 space-y-3 w-full">
          <button class="mx-auto" @click="closeDialog">
            <IconClose />
          </button>
          <ButtonPill
            v-for="item in data"
            :key="item"
            :class="[
              isSelected(item)
                ? 'text-green-500 bg-opacity-10 bg-green-500 border-green-500'
                : 'border-gray-500',
            ]"
            @click="changeSelectedItem(item)"
            >{{ item }}
          </ButtonPill>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import ArrowDown from '../svg/ArrowDown.vue';
import IconClose from '../svg/IconClose.vue';
import ButtonPill from './ButtonPill.vue';

export default defineComponent({
  components: {
    ButtonPill,
    IconClose,
    ArrowDown,
    Dialog,
    DialogOverlay,
  },
  props: {
    initialSelected: {
      type: String as PropType<string>,
      default: '',
    },
    defaultSelected: {
      type: String as PropType<string>,
      required: true,
    },
    data: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  emits: ['selectedChange'],
  setup(props, context) {
    let showMobileSelect = ref<boolean>(false);

    const initialItem = props.data.includes(props.initialSelected)
      ? props.initialSelected
      : props.defaultSelected;
    let selected = ref<string>(initialItem);

    function isSelected(current: string) {
      return selected.value == current;
    }

    function changeSelectedItem(item: string) {
      selected.value = item;
      context.emit('selectedChange', selected.value);
      closeDialog();
    }

    function closeDialog() {
      showMobileSelect.value = false;
    }

    return {
      selected,
      showMobileSelect,
      isSelected,
      changeSelectedItem,
      closeDialog,
    };
  },
});
</script>
