<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <template v-if="!auth.ready">
    {{ t('datasets.editView.authorizationChecking') }}
  </template>
  <template v-else>
    <template v-if="!datasetConfigStore.hasUpdatePermission">
      <AlertError
        :title="'Error!'"
        :content="t('datasets.editView.notAuthorized')"
      />
    </template>
    <template v-else-if="datasetConfigStore.isSourceGenerated">
      <AlertError
        :title="'Error!'"
        :content="t('datasets.editView.notAvailableForGeneratedSource')"
      />
    </template>
    <template v-else-if="datasetConfigStore.config?.views?.edit == null">
      <AlertError
        :title="'Error!'"
        :content="t('datasets.editView.noEditViewConfigured')"
      />
    </template>
    <template v-else>
      <LoadingError v-if="isError" :error="error" />
      <LoadingError v-else-if="isMutateError" :error="mutateError" />
      <template v-else>
        <DiscardChangesDialog @discard="resetAndCleanup" />
        <LeaveSectionDialog
          :is-save-success="isMutateSuccess"
          @save-changes="saveChanges"
        />
        <div class="flex h-screen flex-col justify-between overflow-auto">
          <ShowEmptyFields v-model="showAll" :disabled="true" />
          <div
            class="flex grow md:overflow-y-auto"
            :class="[{ 'pointer-events-none opacity-50': isMutateLoading }]"
          >
            <MainAndSubCategories
              class="md:border-r"
              :data="editStore.current"
              :categories="enhancedMainCategories"
              :sub-categories="enhancedSubcategories"
              :current-category="currentCategory"
              :slug="slug"
              :show-all="true"
              :show-edit-hint="true"
              :editable="true"
              :is-start-or-fetch="isStartOrFetch"
            />
            <EditToolBox />
          </div>
          <EditFooter
            class="transition-all"
            :is-saving="isMutateLoading"
            :class="{ hidden: editStore.isEqual }"
            @cancel="tryToDiscardChanges"
            @save="saveChanges"
          />
        </div>
      </template>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { useApiMutate, useApiReadForCurrentDataset } from '../../api';
import { useI18n } from 'vue-i18n';
import { useAuth } from '../../auth/store/auth';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import EditFooter from './EditFooter.vue';
import { useCategories } from '../category/useCategories';
import EditToolBox from './toolBox/EditToolBox.vue';
import { useEditStore } from './store/editStore';
import { useEditStoreSync } from './useEditStoreSync';
import { useApplyError } from './useApplyError';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { DatasetPage } from '../../../routes';
import DiscardChangesDialog from './dialogs/DiscardChangesDialog.vue';
import LeaveSectionDialog from './dialogs/LeaveSectionDialog.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';
import { useDialogsStore } from './dialogs/dialogsStore';
import { useEventListener } from '@vueuse/core';
import AlertError from '../../../components/alert/AlertError.vue';
import MainAndSubCategories from '../common/MainAndSubCategories.vue';
import LoadingError from '../../../components/loading/LoadingError.vue';
import {
  useEventSaveChanges,
  useEventDiscardChanges,
} from '../../cellComponents/components/utils/editList/dialogMultipleFilesLanguage/utils';
const { t } = useI18n();

const showAll = ref(true);

const auth = useAuth();

const editStore = useEditStore();

const datasetConfigStore = useDatasetConfigStore();

useEventSaveChanges.on((value: boolean) => {
  if (value) {
    saveChanges();
  }
});

useEventDiscardChanges.on((value: boolean) => {
  if (value) {
    resetAndCleanup();
  }
});

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isStartOrFetch, data, error, url } =
  datasetConfigStore.isNewView
    ? {
        isError: ref(false),
        isStartOrFetch: ref(false),
        data: ref(),
        error: ref(),
        url: computed(() => datasetConfigStore.currentPath ?? ''),
      }
    : useApiReadForCurrentDataset({ withQueryParameters: false });

const mutation = computed(() =>
  datasetConfigStore.isNewView ? 'create' : 'update'
);
const {
  isMutateSuccess,
  isMutateLoading,
  isMutateError,
  mutateData,
  mutateError,
  resetMutate,
  mutate,
} = useApiMutate(url, mutation);

// Enhance categories and subcategories with any errors
const { enhancedMainCategories, enhancedSubcategories, cleanErrors } =
  useApplyError(categories, subcategories, mutateError);

// Sync data to edit store
const storeSync = useEditStoreSync(data, isMutateSuccess, mutate);

// Triggers request and sync editStore
const saveChanges = () => storeSync.mutate();

// Reset store and cleanup errors
const resetAndCleanup = () => {
  storeSync.reset();
  cleanErrors();
  resetMutate.value();
};

const dialogsStore = useDialogsStore();

// Cancel callback
const tryToDiscardChanges = () => {
  if (editStore.isEqual) {
    // If there are no changes, just clean everything up
    resetAndCleanup();
  } else if (!dialogsStore.isAnyDialogOpen) {
    // If there are changes and no dialog is visible, then show
    // dialog to decide if discard changes or not
    dialogsStore.discardChangesDialogVisible = true;
  }
};

// If create mutation was successful,
// redirect to detail page of new record
const router = useRouter();
watch(
  () => isMutateSuccess.value,
  (success) => {
    if (datasetConfigStore.isNewView && success) {
      // At the moment there are at least two different forms of response
      // when a new record is created. The first one is from the EventShort
      // dataset, the second comes from the Article dataset
      const id = mutateData.value?.data.id ?? mutateData.value?.data.Value.id;
      if (id != null) {
        router.push({
          name: DatasetPage.DETAIL,
          params: { id },
        });
      }
    }
  },
  { immediate: true }
);

// Listen for window close / reload event and let the user know
// if there are unsaved changes
useEventListener(window, 'beforeunload', (evt) => {
  if (!editStore.isEqual) {
    evt.returnValue = 'Do you really want to close?';
    return evt.returnValue;
  }
});
</script>
