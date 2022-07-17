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
        <div>Edit View</div>
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

const { t } = useI18n();

const auth = useAuth();

const datasetConfigStore = useDatasetConfigStore();

const { isError, isSuccess, error } = useApiForCurrentDataset();
</script>
