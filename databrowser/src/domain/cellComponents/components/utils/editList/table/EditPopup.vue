<template>
  <ThreeDotsPopover>
    <PopoverCustomPanel v-slot="{ close }">
      <PopoverContent
        with-hover
        class="flex items-center gap-2"
        @click="emitEvent('duplicate', close)"
      >
        <IconCopy class="text-green-500" />
        <div>Duplicate</div>
      </PopoverContent>
      <PopoverContentDivider />
      <PopoverContent
        disabled
        class="flex items-center gap-2"
        @click="emitEvent('push', close)"
      >
        <IconPush />
        <div>Push</div>
      </PopoverContent>
      <PopoverContentDivider />
      <PopoverContent
        with-hover
        class="flex items-center gap-2"
        @click="emitEvent('delete', close)"
      >
        <IconDelete class="text-delete" />
        <div>Delete</div>
      </PopoverContent>
    </PopoverCustomPanel>
  </ThreeDotsPopover>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import PopoverCustomPanel from '../../../../../../components/popover/PopoverCustomPanel.vue';
import PopoverContentDivider from '../../../../../../components/popover/PopoverContentDivider.vue';
import PopoverContent from '../../../../../../components/popover/PopoverContent.vue';
import IconCopy from '../../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../../components/svg/IconDelete.vue';
import IconPush from '../../../../../../components/svg/IconPush.vue';
import ThreeDotsPopover from '../../../../../../components/popover/ThreeDotsPopover.vue';

const emit = defineEmits(['duplicate', 'push', 'delete']);

const emitEvent = (
  event: 'duplicate' | 'push' | 'delete',
  closePopup: () => void
) => {
  emit(event);
  closePopup();
};
</script>
