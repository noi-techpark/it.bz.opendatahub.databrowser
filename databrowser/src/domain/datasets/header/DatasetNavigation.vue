<template>
  <div class="bg-gray-50 text-sm">
    <div class="overflow-x-auto whitespace-nowrap">
      <ContentAlignmentX class="flex items-center">
        <ButtonLink
          variant="ghost"
          size="xs"
          class="mr-2 flex h-6 items-center bg-white py-1 px-3 md:mr-9"
          :to="tableViewPath"
        >
          <IconStrokedArrowDown
            class="mr-1 -ml-1 h-5 w-5 rotate-90 stroke-current"
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
          v-if="showQuickViewTab"
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
          v-if="showEditTab"
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
import { usePaths } from './usePaths';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { computed } from 'vue';

const { t } = useI18n();

const datasetConfigStore = useDatasetConfigStore();

const {
  detailViewPath,
  quickViewPath,
  rawViewPath,
  editViewPath,
  tableViewPath,
  newViewPath,
} = usePaths();

const isNewView = computed(() => datasetConfigStore.isNewView);

const showEditTab = computed(
  () =>
    !isNewView.value &&
    !datasetConfigStore.isSourceGenerated &&
    datasetConfigStore.hasUpdatePermission
);

const showQuickViewTab = computed(
  () => !isNewView.value && datasetConfigStore.hasQuickView
);
</script>
