<template>
  <div class="text-sm bg-gray-50">
    <div class="overflow-x-auto whitespace-nowrap">
      <ContentAlignmentX class="flex items-center">
        <ButtonLink
          variant="ghost"
          size="xs"
          class="flex items-center py-1 px-3 mr-2 h-6 bg-white md:mr-9"
          :to="tableViewPath"
        >
          <IconStrokedArrowDown
            class="mr-1 -ml-1 w-5 h-5 rotate-90 stroke-current"
          />
          <span class="line-height-1">
            {{ t('datasets.navigation.tableView') }}
          </span>
        </ButtonLink>

        <TabLink
          v-if="isNewView"
          :label="t('datasets.navigation.newView')"
          :to="newViewPath"
          :active="true"
        ></TabLink>

        <TabLink
          v-if="!isNewView"
          :label="t('datasets.navigation.quickView')"
          :to="quickViewPath"
          :active="datasetConfigStore.isQuickView"
        />
        <TabLink
          v-if="!isNewView"
          :label="t('datasets.navigation.detailView')"
          :to="detailViewPath"
          :active="datasetConfigStore.isDetailView"
        />
        <TabLink
          v-if="!isNewView && datasetConfigStore.hasUpdatePermission"
          :label="t('datasets.navigation.editView')"
          :to="editViewPath"
          :active="datasetConfigStore.isEditView"
        />
        <TabLink
          v-if="!isNewView"
          :label="t('datasets.navigation.rawView')"
          :to="rawViewPath"
          :active="datasetConfigStore.isRawView"
        />
      </ContentAlignmentX>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import TabLink from '../../../components/tab/TabLink.vue';
import { useI18n } from 'vue-i18n';
import { DatasetPage } from '../../../routes';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { computed } from 'vue';

const { t } = useI18n();

const datasetConfigStore = useDatasetConfigStore();

const detailViewPath = { name: DatasetPage.DETAIL };
const quickViewPath = { name: DatasetPage.QUICK };
const rawViewPath = { name: DatasetPage.RAW };
const editViewPath = { name: DatasetPage.EDIT };
const tableViewPath = { name: DatasetPage.TABLE };
const newViewPath = { name: DatasetPage.NEW };

const isNewView = computed(() => datasetConfigStore.isNewView);
</script>
