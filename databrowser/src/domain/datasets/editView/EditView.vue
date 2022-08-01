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
        <div class="flex flex-col justify-between h-screen">
          <div class="flex overflow-y-auto">
            <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
              <DetailCategories
                :categories="categories"
                :slug="slug"
                class="overflow-y-auto sticky top-0 py-6 bg-white md:w-1/6 md:h-full"
              />

              <DetailSubCategories
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
          <EditContent />
          <EditFooter @cancel="cancel" @save="save" />
        </div>
      </template>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { useApiForCurrentDataset } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '../../auth/store/auth';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import EditContent from './EditContent.vue';
import EditFooter from './EditFooter.vue';
import { useDetail } from '../detailView/useDetail';
import DetailCategories from '../detailView/DetailCategories.vue';
import DetailSubCategories from '../detailView/DetailSubCategories.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import EditToolBox from './EditToolBox.vue';
import { watch } from 'vue';
import { useEditStore } from './store/editStore';
import { EditData } from './store/initialState';

const { t } = useI18n();

const auth = useAuth();

const datasetConfigStore = useDatasetConfigStore();

const { slug, categories, subcategories, currentCategory } = useDetail();

const { isError, isSuccess, data, error } = useApiForCurrentDataset();

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

const cancel = () => {
  console.log('Cancelling');
};

const save = () => {
  console.log('Saving');
};
</script>
