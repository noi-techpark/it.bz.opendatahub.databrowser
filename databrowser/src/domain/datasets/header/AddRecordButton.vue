<template>
  <ButtonLink
    :to="{ name: DatasetPage.NEW }"
    size="xs"
    class="flex h-6 items-center py-1 px-3"
  >
    {{ t('datasets.header.addRecord') }}
  </ButtonLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { DatasetPage } from '../../../routes';

const { t } = useI18n();
</script>
