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
      <template v-if="isError">
        <ShowApiError :error="error" class="h-24 overflow-auto" />
      </template>
      <template v-if="isMutateError">
        <ShowApiError :error="mutateError" class="h-24 overflow-auto" />
      </template>
      <template v-if="isSuccess">
        <DiscardChangesDialog @discard="resetAndCleanup" />
        <LeaveSectionDialog
          :is-save-success="isMutateSuccess"
          @save-changes="saveChanges"
        />
        <div class="flex h-screen flex-col justify-between overflow-auto">
          <ShowEmptyFields v-model="showAll" :disabled="true" />
          <div
            class="flex grow overflow-y-auto"
            :class="[{ 'opacity-50 pointer-events-none': isMutateLoading }]"
          >
            <ContentAlignmentX
              class="md:flex md:overflow-y-auto md:border-r md:px-0"
            >
              <MainCategories
                :categories="enhancedMainCategories"
                :slug="slug"
                class="sticky top-0 z-20 overflow-y-auto bg-white py-3 md:h-full md:w-1/6"
              />
              <div
                v-if="slug !== ''"
                class="flex-1 overflow-y-auto pb-6 md:h-full md:py-3 md:px-20"
              >
                <EditHint class="mb-8" />
                <SubCategories
                  :data="editStore.current"
                  :category="currentCategory"
                  :sub-categories="enhancedSubcategories"
                  :show-all="true"
                  :editable="true"
                />
              </div>
            </ContentAlignmentX>
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
import ShowApiError from '../../api/components/ShowApiError.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '../../auth/store/auth';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import EditFooter from './EditFooter.vue';
import { useCategories } from '../category/useCategories';
import MainCategories from '../category/MainCategories.vue';
import SubCategories from '../category/SubCategories.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import EditToolBox from './EditToolBox.vue';
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
import EditHint from './EditHint.vue';

const { t } = useI18n();

const showAll = ref(true);

const auth = useAuth();

const editStore = useEditStore();

const datasetConfigStore = useDatasetConfigStore();

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isSuccess, data, error, url } = datasetConfigStore.isNewView
  ? {
      isError: ref(false),
      isSuccess: ref(true),
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
