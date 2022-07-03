<template>
  <template v-if="!auth.ready">
    {{ t('datasets.editView.authorizationChecking') }}
  </template>
  <template v-else>
    <template v-if="!showEdit">
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
import { defineProps, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '../../auth/store/auth';

const { t } = useI18n();

const props = defineProps<{ showEdit: boolean; viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { isError, isSuccess, error } = useApiForViewConfig({
  viewConfig,
});

const auth = useAuth();
</script>
