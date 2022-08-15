<template>
  <PopoverCustom class="relative">
    <span ref="trigger">
      <PopoverCustomButton
        v-slot="{ open }"
        class="flex justify-center items-center w-6 h-6 text-green-500 focus:text-white hover:bg-green-500/10 focus:bg-green-500 rounded border hover:border-green-500"
      >
        <IconThreeDots
          class="transition-transform fill-current"
          :class="{ 'rotate-90': open }"
        />
      </PopoverCustomButton>
    </span>

    <Teleport to="body">
      <div ref="container" class="z-20 w-screen max-w-sm">
        <PopoverCustomPanel v-slot="{ close }">
          <PopoverContent
            with-hover
            class="flex gap-2 items-center"
            @click="emitEvent('duplicate', close)"
          >
            <IconCopy class="text-green-500" />
            <div>Duplicate</div>
          </PopoverContent>
          <PopoverContentDivider />
          <PopoverContent
            disabled
            class="flex gap-2 items-center"
            @click="emitEvent('push', close)"
          >
            <IconPush />
            <div>Push</div>
          </PopoverContent>
          <PopoverContentDivider />
          <PopoverContent
            with-hover
            class="flex gap-2 items-center"
            @click="emitEvent('delete', close)"
          >
            <IconDelete class="text-delete" />
            <div>Delete</div>
          </PopoverContent>
        </PopoverCustomPanel>
      </div>
    </Teleport>
  </PopoverCustom>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import IconThreeDots from '../../../../../../components/svg/IconThreeDots.vue';
import PopoverCustom from '../../../../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../../../../components/popover/PopoverCustomPanel.vue';
import PopoverContentDivider from '../../../../../../components/popover/PopoverContentDivider.vue';
import PopoverContent from '../../../../../../components/popover/PopoverContent.vue';
import { usePopper } from '../../../../../../components/utils/usePopper';
import IconCopy from '../../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../../components/svg/IconDelete.vue';
import IconPush from '../../../../../../components/svg/IconPush.vue';

const emit = defineEmits(['duplicate', 'push', 'delete']);

let [trigger, container] = usePopper({
  placement: 'bottom-start',
  strategy: 'absolute',
  modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
});

const emitEvent = (
  event: 'duplicate' | 'push' | 'delete',
  closePopup: () => void
) => {
  emit(event);
  closePopup();
};
</script>
