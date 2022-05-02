<template>
  <header class="flex flex-wrap items-center pt-1 pb-2 text-xs md:py-3">
    <!-- Dataset title -->
    <span class="mr-1 w-full text-base font-bold text-black md:w-auto">
      {{ viewConfig.description?.title }}
    </span>

    <!-- More info -->
    <ButtonCustom
      variant="ghost"
      size="xs"
      class="flex items-center py-1 px-3 mr-1 h-6"
    >
      <IconInfo class="mr-2 stroke-current" />
      <span class="line-height-1">{{ $t('datasets.header.moreInfo') }}</span>
    </ButtonCustom>

    <!-- Popup -->
    <DatasetHeaderConfigPopup
      :picked="picked"
      :column-width="columnWidth"
      @picked-change="picked = $event"
      @column-width-change="columnWidth = $event"
    />

    <!-- Show information if current view is auto generated -->
    <div
      v-if="picked === 'generated' || viewConfig.source === 'generated'"
      class="flex items-center py-1 px-3 ml-1 text-[#AA5B00] bg-[#FDF2E6] rounded"
    >
      <span
        class="inline-block mr-1 w-1 h-1 bg-current rounded-full dot"
      ></span>
      <span>{{ $t('datasets.header.viewGeneratedConfig') }}</span>
    </div>

    <!-- Language picker -->
    <LanguagePicker class="ml-auto" />
  </header>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconInfo from '../../../components/svg/IconInfo.vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const picked = ref<string>('');
const columnWidth = ref<string>('');
</script>
