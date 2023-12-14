<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AlertError :title="t('datasets.error.save.title')">
    <ul>
      <li
        v-for="(responseError, key) in responseErrors?.errors"
        :key="key"
        class="list-inside list-disc"
      >
        {{ responseError[0] }}
      </li>
    </ul>
  </AlertError>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import AlertError from '../../../../components/alert/AlertError.vue';

const { t } = useI18n();

defineProps<{
  responseErrors?: { errors?: Record<string, string[]> } | null;
}>();
</script>
