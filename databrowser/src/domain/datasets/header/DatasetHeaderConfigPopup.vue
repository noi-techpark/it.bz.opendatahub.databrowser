<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ThreeDotsPopup>
    <PopoverCustomPanel class="min-w-[20rem]">
      <PopoverContentHeader>
        {{ t('datasets.header.switchViews') }}
      </PopoverContentHeader>
      <PopoverContentDivider />
      <RadioCustom
        class="p-4 hover:bg-gray-50"
        value="embedded"
        :model-value="internalPicked"
        :label="t('datasets.header.viewEmbeddedConfig')"
        @update:model-value="changePicked"
      />
      <PopoverContentDivider />
      <RadioCustom
        class="p-4 hover:bg-gray-50"
        value="generated"
        :model-value="internalPicked"
        :label="t('datasets.header.viewGeneratedConfig')"
        @update:model-value="changePicked"
      />
    </PopoverCustomPanel>
  </ThreeDotsPopup>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import PopoverContentDivider from '../../../components/popover/PopoverContentDivider.vue';
import PopoverContentHeader from '../../../components/popover/PopoverContentHeader.vue';
import RadioCustom from '../../../components/radio/RadioCustom.vue';
import { useI18n } from 'vue-i18n';
import ThreeDotsPopup from '../../../components/popover/ThreeDotsPopover.vue';
import { SourceType } from '../../datasetConfig/source/types';

const { t } = useI18n();

const props = defineProps<{ picked: SourceType }>();
const { picked } = toRefs(props);

const emit = defineEmits<{
  (event: 'pickedChange', source: SourceType): void;
}>();

const internalPicked = ref(picked.value);
watch(picked, () => (internalPicked.value = picked.value));

const changePicked = (value: SourceType) => {
  internalPicked.value = value;
  emit('pickedChange', value);
};
</script>
