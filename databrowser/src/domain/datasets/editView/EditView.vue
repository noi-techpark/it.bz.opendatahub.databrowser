<template>
  <template v-if="!auth.ready">
    {{ t('datasets.editView.authorizationChecking') }}
  </template>
  <template v-else>
    <template v-if="!datasetConfigStore.hasUpdatePermission">
      {{ t('datasets.editView.notAuthorized') }}
    </template>
    <template v-else>
      <template v-if="isError">
        <ShowApiError :error="error" />
      </template>
      <template v-if="isSuccess === true">
        <div class="flex gap-2">
          <div>isMutateError: {{ isMutateError }}</div>
          <div>isMutateSuccess: {{ isMutateSuccess }}</div>
          <div>isMutateLoading: {{ isMutateLoading }}</div>
          <div>isMutateIdle: {{ isMutateIdle }}</div>
          <div>isMutatePaused: {{ isMutatePaused }}</div>
          <div v-if="isMutateError" class="text-error">
            mutateError:
            {{ JSON.stringify((mutateError as any).response.data) }}
          </div>
        </div>
        <div class="flex overflow-auto flex-col justify-between h-screen">
          <div class="flex overflow-y-auto">
            <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
              <MainCategories
                :categories="enhancedMainCategories"
                :slug="slug"
                class="overflow-y-auto sticky top-0 py-6 bg-white md:w-1/6 md:h-full"
              />
              <SubCategories
                v-if="slug !== ''"
                class="overflow-y-auto flex-1 pb-6 md:py-6 md:px-20 md:h-full"
                :data="editStore.current"
                :category="currentCategory"
                :sub-categories="enhancedSubcategories"
                :show-all="true"
              />
            </ContentAlignmentX>
            <EditToolBox />
          </div>
          <EditFooter @cancel="cancel" @save="save" />
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

const { t } = useI18n();

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
  : useApiReadForCurrentDataset();

const mutation = computed(() =>
  datasetConfigStore.isNewView ? 'create' : 'update'
);
const {
  isMutateSuccess,
  isMutateError,
  isMutateIdle,
  isMutateLoading,
  isMutatePaused,
  mutateData,
  mutateError,
  mutate,
} = useApiMutate(url, mutation);

// Enhance categories and subcategories with any errors
const { enhancedMainCategories, enhancedSubcategories, cleanErrors } =
  useApplyError(categories, subcategories, mutateError);

// Sync data to edit store
const storeSync = useEditStoreSync(data, isMutateSuccess, mutate);

// Save callback triggers request and syncs editStore
const save = () => {
  storeSync.mutate();
};

// Cancel callback
const cancel = () => {
  storeSync.reset();
  cleanErrors();
};

// If create mutation was successful,
// redirect to detail page of new record
const router = useRouter();
watch(
  () => isMutateSuccess.value,
  (success) => {
    if (datasetConfigStore.isNewView && success) {
      const id = mutateData.value?.data.id;
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
</script>
