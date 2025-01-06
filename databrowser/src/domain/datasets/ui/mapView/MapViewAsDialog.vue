<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DialogFullScreen :is-open="isOpen">
    <div class="flex h-full flex-col overflow-auto">
      <div class="p-2 md:px-6 md:py-3">
        <header class="flex items-center justify-between gap-2">
          <div>
            <span class="text-xl">
              {{
                t('datasets.mapView.headerBig', {
                  activeDatasetCount: activeDatasets.length,
                  recordTotal: recordTotal,
                })
              }}
            </span>
            <span>
              {{ t('datasets.mapView.headerSmall', { datasetCount }) }}
            </span>
          </div>
          <div class="relative flex items-center gap-2">
            <LanguagePicker
              class="hidden md:flex"
              :current-language="currentLanguage"
              :z-index="zIndexForSubComponents"
            />
            <ButtonCustom
              :size="Size.xs"
              :variant="Variant.ghost"
              class="mr-2 border-none md:mr-0"
              @click="emit('close')"
            >
              <IconClose />
            </ButtonCustom>
          </div>
        </header>

        <div class="flex justify-between gap-2 md:hidden">
          <ButtonCustom
            class="flex w-full items-center justify-center gap-2"
            :variant="Variant.ghost"
            :size="Size.sm"
            :indicator="datasetFilterVisible"
            @click="datasetFilterVisible = !datasetFilterVisible"
          >
            <IconDataset />
            Datasets
          </ButtonCustom>
          <ButtonCustom
            class="flex w-full items-center justify-center gap-2"
            :variant="Variant.ghost"
            :size="Size.sm"
            :indicator="true"
          >
            <IconFilter />
            Filter
          </ButtonCustom>
          <LanguagePicker
            class="md:hidden"
            :current-language="currentLanguage"
            :z-index="zIndexForSubComponents"
          />
        </div>
      </div>
      <div
        class="flex h-full gap-4 overflow-y-auto overflow-x-hidden md:px-6 md:pb-6"
      >
        TODO: implement map
      </div>
    </div>
  </DialogFullScreen>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Size, Variant } from '../../../../components/button/types';
import DialogFullScreen from '../../../../components/dialog/DialogFullScreen.vue';
import { mapViewBaseZIndex } from './consts';
import { MapDataset } from './types';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import LanguagePicker from '../../../../components/language/LanguagePicker.vue';
import IconFilter from '../../../../components/svg/IconFilter.vue';
import IconDataset from '../../../../components/svg/IconDataset.vue';
import IconClose from '../../../../components/svg/IconClose.vue';
const { t } = useI18n();
const emit = defineEmits<{ (e: 'close'): void }>();

defineProps<{ isOpen: boolean }>();

const router = useRouter();

const zIndexForSubComponents = mapViewBaseZIndex + 1;

const currentLanguage = computed(() => {
  const language = router.currentRoute.value.query.language;
  return Array.isArray(language) ? language[0] : language;
});

const datasetCount = ref(0);

const activeDatasets = ref<MapDataset[]>([]);

const datasetFilterVisible = ref(false);

const recordTotal = ref(0);
</script>
