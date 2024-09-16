<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ThreeDotsPopup large>
    <PopoverCustomPanel class="min-w-[16rem]">
      <PopoverContentHeader>
        {{ t('datasets.header.tableSettings') }}
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
      <PopoverContentDivider />

      <ShowDeprecatedFields
        v-model="tableViewColsStore.showDeprecated"
        custom-wrapper-classes="flex justify-between cursor-pointer p-4 hover:bg-gray-50"
        custom-text-classes="!text-base"
        :use-container-classes="false"
        :use-wrapper-classes="false"
      />
    </PopoverCustomPanel>
  </ThreeDotsPopup>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import PopoverContentDivider from '../../../../components/popover/PopoverContentDivider.vue';
import PopoverContentHeader from '../../../../components/popover/PopoverContentHeader.vue';
import PopoverCustomPanel from '../../../../components/popover/PopoverCustomPanel.vue';
import ThreeDotsPopup from '../../../../components/popover/ThreeDotsPopover.vue';
import ShowDeprecatedFields from '../common/showDeprecatedFields/ShowDeprecatedFields.vue';
import RadioCustom from '../../../../components/radio/RadioCustom.vue';
import { DatasetConfigSource } from '../../config/types';
import { useTableViewColsStore } from '../tableView/tableViewColsStore';

const { t } = useI18n();

const tableViewColsStore = useTableViewColsStore();

const props = defineProps<{ picked: DatasetConfigSource }>();
const { picked } = toRefs(props);

const emit = defineEmits<{
  (event: 'pickedChange', source: DatasetConfigSource): void;
}>();

const internalPicked = ref(picked.value);
watch(picked, () => (internalPicked.value = picked.value));

const changePicked = (value: DatasetConfigSource) => {
  internalPicked.value = value;
  emit('pickedChange', value);
};
</script>
