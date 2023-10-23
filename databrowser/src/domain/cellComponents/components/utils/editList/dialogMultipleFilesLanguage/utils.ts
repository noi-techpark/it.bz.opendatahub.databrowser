// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEventBus } from '@vueuse/core';
import { FileEntry } from '../../../cells/eventDocumentCell/types';
import { useEditStore } from '../../../../../datasets/editView/store/editStore';
import { FileEntryWithLanguageAvailability } from './types';
import { useDialogStore } from './dialogStore';
import { FilterLanguage } from '../../../../../datasets/language';
import { ParameterValue } from '../../../../../api/service/types';

export const useEventSaveChanges = useEventBus<boolean>('saveChanges');
export const useEventDiscardChanges = useEventBus<boolean>('discardChanges');

export const getCurrentDocumentLanguageAvailability = (item: FileEntry) => {
  const { Documents } = JSON.parse(useEditStore().currentAsJson);

  const foundLanguages = [];
  for (const lang in Documents) {
    const currentLanguageDocuments = Documents[lang];
    for (const currentDocument of currentLanguageDocuments) {
      if (currentDocument.DocumentURL === item.src) {
        foundLanguages.push(lang);
      }
    }
  }

  return foundLanguages.join(', ');
};

export const setDataForDocumentEdit = (item: FileEntry) => {
  const { Documents } = JSON.parse(useEditStore().currentAsJson);

  const dialogStore = useDialogStore();
  const dialogData = [] as FileEntryWithLanguageAvailability[];

  for (const lang in Documents) {
    const currentLanguageDocuments = Documents[lang];
    for (const currentDocument of currentLanguageDocuments) {
      if (currentDocument.DocumentURL === item.src) {
        dialogData.push({
          documentName: currentDocument.DocumentName,
          language: lang,
          // FIXME
          available: true,
        });
      }
    }
  }

  dialogStore.setItems([
    {
      name: item.src,
      src: item.src,
      data: dialogData,
    },
  ]);
};

export const clearDialogStore = () => {
  const dialogStore = useDialogStore();
  dialogStore.setItems([]);
};

export const setDialogItems = (
  items: any[],
  currentLanguage?: ParameterValue
) => {
  const dialogStore = useDialogStore();

  const data = [];

  const supportedLanguages = Object.values(FilterLanguage);

  for (const item of items) {
    const itemData = [];

    for (const language of supportedLanguages) {
      itemData.push({
        documentName: '',
        language,
        available: currentLanguage === language,
        disableAvailabilityChange: currentLanguage === language,
      });
    }

    data.push({
      name: item.name,
      src: item.src,
      data: itemData,
    });
  }

  dialogStore.setItems(data);
};

export const updateItemsInModalAndSave = () => {
  const editStore = useEditStore();
  const currentState = JSON.parse(editStore.currentAsJson);
  const dialogStore = useDialogStore();
  const items = dialogStore.items;

  const { Documents } = currentState;

  for (const lang in Documents) {
    const currentLanguageDocuments = Documents[lang];
    for (const currentDocument of currentLanguageDocuments) {
      const sameDocumentInModal = items.find(
        (item) => item.src === currentDocument.DocumentURL
      );
      if (!sameDocumentInModal) continue;

      const itemToUpdate = sameDocumentInModal.data.find(
        (item) => item.language === lang
      );

      if (!itemToUpdate) continue;

      currentDocument.DocumentName = itemToUpdate.documentName;
    }
  }

  editStore.setCurrent({ ...currentState, Documents });
};

export const addItemsInModalAndSave = () => {
  const editStore = useEditStore();
  const currentState = JSON.parse(editStore.currentAsJson);
  const dialogStore = useDialogStore();
  const items = dialogStore.items;

  const { Documents } = currentState;

  for (const item of items) {
    for (const itemData of item.data.filter((v) => v.available)) {
      if (!itemData.language) continue;

      Documents[itemData.language] ??= [];
      const uploadedDocumentIndex = Documents[itemData.language].findIndex(
        (documentData: any) => documentData.DocumentURL === item.src
      );

      if (uploadedDocumentIndex >= 0) {
        Documents[itemData.language][uploadedDocumentIndex].DocumentName =
          itemData.documentName;
      } else {
        Documents[itemData.language].push({
          DocumentName: itemData.documentName,
          Language: itemData.language,
          DocumentURL: item.src,
        });
      }
    }
  }

  editStore.setCurrent({ ...currentState, Documents });
};
