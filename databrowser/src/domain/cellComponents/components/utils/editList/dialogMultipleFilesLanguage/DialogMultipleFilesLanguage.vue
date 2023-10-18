<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <DialogOverlay />
      <DialogOverlayContainer>
        <DialogPanel
          class="w-full max-w-2xl overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all"
        >
          <div class="bg-gray-50 px-4 py-6">
            <DialogTitle
              as="h3"
              class="text-center text-xl font-semibold leading-6 text-dialog"
            >
              {{ t('datasets.editView.dialog.multilpleFilesLanguage.title') }}
            </DialogTitle>
            <DialogDescription class="mt-4 text-center text-dialog">
              {{
                t('datasets.editView.dialog.multilpleFilesLanguage.description')
              }}
            </DialogDescription>
          </div>
          <div class="mt-4 flex flex-col gap-2 px-4 pb-4">
            <EditListDocumentLanguagesTab
              :items="dialogStore.items"
              class="max-h-[32rem] overflow-y-auto"
            >
              <template #body="{ item }">
                <EventDocumentInputDialogTable :items="item" />
              </template>
            </EditListDocumentLanguagesTab>
            <div class="flex flex-col gap-2">
              <ButtonCustom
                :variant="Variant.solid"
                class="grow"
                @click="saveAndNext()"
                >{{
                  t(
                    'datasets.editView.dialog.multilpleFilesLanguage.buttonSaveAndNext'
                  )
                }}</ButtonCustom
              >
              <ButtonCustom
                :variant="Variant.ghost"
                class="grow"
                @click="discardUpdates()"
                >{{
                  t(
                    'datasets.editView.dialog.multilpleFilesLanguage.buttonDiscardChanges'
                  )
                }}</ButtonCustom
              >
            </div>
          </div>
        </DialogPanel>
      </DialogOverlayContainer>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from '@headlessui/vue';

import DialogOverlay from '../../../../../../components/dialog/DialogOverlay.vue';
import DialogOverlayContainer from '../../../../../../components/dialog/DialogOverlayContainer.vue';
import EventDocumentInputDialogTable from './EventDocumentInputDialogTable.vue';
import EditListDocumentLanguagesTab from './EditListDocumentLanguagesTab.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';
import { useDialogStore } from './dialogStore';
import {
  useEventSaveChanges,
  useEventDiscardChanges,
  addItemsInModalAndSave,
  updateItemsInModalAndSave,
} from './utils';

const { t } = useI18n();
const emit = defineEmits(['save', 'close']);

const dialogStore = useDialogStore();

const props = defineProps<{
  isOpen: boolean;
  isAdd?: boolean;
}>();

const saveAndNext = () => {
  if (props.isAdd) {
    addItemsInModalAndSave();
  } else {
    updateItemsInModalAndSave();
  }

  useEventSaveChanges.emit(true);
  emit('close');
};

const discardUpdates = () => {
  useEventDiscardChanges.emit(true);
  emit('close');
};
</script>