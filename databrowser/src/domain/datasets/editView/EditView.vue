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
          <div>isUpdateError: {{ isUpdateError }}</div>
          <div>isUpdateSuccess: {{ isUpdateSuccess }}</div>
          <div>isUpdateLoading: {{ isUpdateLoading }}</div>
          <div>isUpdateIdle: {{ isUpdateIdle }}</div>
          <div>isUpdatePaused: {{ isUpdatePaused }}</div>
          <div v-if="isUpdateError">updateError:</div>
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
import { useApiReadForCurrentDataset } from '../../api';
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
import { useApiUpdate } from '../../api';
import { useEditStoreSync } from './useEditStoreSync';
import { useApplyError } from './useApplyError';

const { t } = useI18n();

const auth = useAuth();

const editStore = useEditStore();

const datasetConfigStore = useDatasetConfigStore();

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isSuccess, data, error, url } = useApiReadForCurrentDataset();

// Config for update. Note the "update" function that, when invoked, triggers the update
const {
  isUpdateSuccess,
  isUpdateError,
  isUpdateIdle,
  isUpdateLoading,
  isUpdatePaused,
  updateError,
  update,
} = useApiUpdate(url);

// Enhance categories and subcategories with any errors
const { enhancedMainCategories, enhancedSubcategories, cleanErrors } =
  useApplyError(categories, subcategories, updateError);

// Sync data to edit store
const storeSync = useEditStoreSync(data, isUpdateSuccess, update);

// Save callback
const save = () => storeSync.update();

// Cancel callback
const cancel = () => {
  storeSync.reset();
  cleanErrors();
};
</script>
