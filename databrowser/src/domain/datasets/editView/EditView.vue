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
          <div>updateError: {{ updateError }}</div>
        </div>
        <div class="flex overflow-auto flex-col justify-between h-screen">
          <div class="flex overflow-y-auto">
            <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
              <MainCategories
                :categories="categories"
                :slug="slug"
                class="overflow-y-auto sticky top-0 py-6 bg-white md:w-1/6 md:h-full"
              />
              <SubCategories
                v-if="slug !== ''"
                class="overflow-y-auto flex-1 pb-6 md:py-6 md:px-20 md:h-full"
                :data="editStore.current"
                :category="currentCategory"
                :sub-categories="subcategories"
                :show-all="true"
              />
            </ContentAlignmentX>
            <EditToolBox />
          </div>
          <EditFooter @cancel="cancel" @save="updateData" />
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
import { useDetail } from '../detailView/useDetail';
import MainCategories from '../category/MainCategories.vue';
import SubCategories from '../category/SubCategories.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import EditToolBox from './EditToolBox.vue';
import { watch } from 'vue';
import { useEditStore } from './store/editStore';
import { EditData } from './store/initialState';
import { useApiUpdate } from '../../api';

const { t } = useI18n();

const auth = useAuth();

const datasetConfigStore = useDatasetConfigStore();

const { slug, categories, subcategories, currentCategory } = useDetail();

const { isError, isSuccess, data, error, url } = useApiReadForCurrentDataset();

const editStore = useEditStore();

watch(
  () => data.value as EditData,
  (dataValue) => {
    if (dataValue == null) {
      return;
    }
    editStore.setInitial({ ...dataValue });
    editStore.setCurrent({ ...dataValue });
  },
  { immediate: true }
);

const {
  isUpdateSuccess,
  isUpdateError,
  isUpdateIdle,
  isUpdateLoading,
  isUpdatePaused,
  updateError,
  update,
} = useApiUpdate(url);

const updateData = () => update(editStore.current);

watch(
  () => isUpdateSuccess.value,
  (isSuccessValue) => {
    if (isSuccessValue === true) {
      editStore.setInitial(editStore.current);
    }
  }
);

const cancel = () => {
  console.log('Cancelling');
};
</script>
