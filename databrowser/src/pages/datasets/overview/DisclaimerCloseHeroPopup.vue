<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverCustom has-arrow>
    <template #trigger>
      <PopoverCustomButton
        trigger-on-hover
        @trigger-click="onPopoverButtonClick()"
      >
        <IconClose class="relative size-6 cursor-pointer text-green-500" />
      </PopoverCustomButton>
    </template>

    <template #container>
      <PopoverCustomPanel
        :has-close-button="false"
        class="max-w-[200px] text-xs text-dialog"
      >
        <PopoverContent>
          <p>
            {{ $t('overview.listPage.heroCloseText') }}
          </p>
        </PopoverContent>
      </PopoverCustomPanel>
    </template>
  </PopoverCustom>
</template>

<script setup lang="ts">
import PopoverCustom from '../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import PopoverContent from '../../../components/popover/PopoverContent.vue';
import IconClose from '../../../components/svg/IconClose.vue';

const emit = defineEmits(['close']);

const onPopoverButtonClick = () => {
  emit('close');
};
</script>
