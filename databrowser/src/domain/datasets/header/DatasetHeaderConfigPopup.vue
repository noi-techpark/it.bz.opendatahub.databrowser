<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ThreeDotsPopup>
    <PopoverCustomPanel>
      <PopoverContentHeader>{{
        t('datasets.header.switchViews')
      }}</PopoverContentHeader>
      <PopoverContentDivider />
      <PopoverContent with-hover class="flex items-center">
        <RadioCustom
          v-model="internalPicked"
          value="embedded"
          :label="t('datasets.header.viewEmbeddedConfig')"
        />
      </PopoverContent>
      <PopoverContentDivider />
      <PopoverContent with-hover class="flex items-center">
        <RadioCustom
          v-model="internalPicked"
          value="generated"
          :label="t('datasets.header.viewGeneratedConfig')"
        />
      </PopoverContent>
      <PopoverContentHeader>{{
        t('datasets.header.selectColumnSize')
      }}</PopoverContentHeader>
      <PopoverContentDivider />
      <PopoverContent class="flex justify-between gap-2">
        <ButtonCustom
          :variant="columnWidth === 'small' ? 'solid' : 'ghost'"
          size="sm"
          class="w-28"
          @click="internalColumnWidth = 'small'"
          >{{ t('datasets.header.columnSizeSmall') }}</ButtonCustom
        >
        <ButtonCustom
          :variant="columnWidth === 'medium' ? 'solid' : 'ghost'"
          size="sm"
          class="w-28"
          @click="internalColumnWidth = 'medium'"
          >{{ t('datasets.header.columnSizeMedium') }}</ButtonCustom
        >
        <ButtonCustom
          :variant="columnWidth === 'large' ? 'solid' : 'ghost'"
          size="sm"
          class="w-28"
          @click="internalColumnWidth = 'large'"
          >{{ t('datasets.header.columnSizeLarge') }}</ButtonCustom
        >
      </PopoverContent>
    </PopoverCustomPanel>
  </ThreeDotsPopup>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import PopoverContentDivider from '../../../components/popover/PopoverContentDivider.vue';
import PopoverContent from '../../../components/popover/PopoverContent.vue';
import PopoverContentHeader from '../../../components/popover/PopoverContentHeader.vue';
import RadioCustom from '../../../components/radio/RadioCustom.vue';
import { useI18n } from 'vue-i18n';
import ThreeDotsPopup from '../../../components/popover/ThreeDotsPopover.vue';

const { t } = useI18n();

const props = defineProps<{ picked: string; columnWidth: string }>();
const { picked, columnWidth } = toRefs(props);

const emit = defineEmits(['pickedChange', 'columnWidthChange']);

const internalPicked = computed({
  get: () => picked.value,
  set: (value) => emit('pickedChange', value),
});

const internalColumnWidth = computed({
  get: () => columnWidth.value,
  set: (value) => emit('columnWidthChange', value),
});
</script>
