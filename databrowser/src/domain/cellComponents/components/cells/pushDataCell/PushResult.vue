<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col gap-2">
    <template v-for="pushResult in pushResults" :key="pushResult.id">
      <div
        class="flex flex-col rounded p-2 text-white"
        :class="[
          pushResult.pushResult.success ? 'bg-hint-info' : 'bg-hint-error',
        ]"
      >
        <div class="flex items-center gap-1">
          <IconCheckCircle v-if="pushResult.pushResult.success" class="w-7" />
          <IconExclamationMark v-else class="w-7" />
          <div class="font-semibold">{{ resultTitle(pushResult) }}</div>
        </div>

        <div class="ml-8">
          <div>{{ resultDescription(pushResult) }}</div>
          <div v-if="pushResult.pushResult.success === false">
            {{
              t('components.pushData.result.pushResultId', {
                id: pushResult.pushResult.id,
              })
            }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconCheckCircle from '../../../../../components/svg/IconCheckCircle.vue';
import IconExclamationMark from '../../../../../components/svg/IconExclamationMark.vue';
import { PublisherWithPushResult } from './types';

const { t } = useI18n();

defineProps<{ pushResults: PublisherWithPushResult[] }>();

const resultTitle = (pushResult: PublisherWithPushResult) =>
  pushResult.pushResult.success
    ? t('components.pushData.result.successTitle', { name: pushResult.name })
    : t('components.pushData.result.errorTitle', { name: pushResult.name });

const resultDescription = (pushResult: PublisherWithPushResult) =>
  pushResult.pushResult.success
    ? t('components.pushData.result.successDescription')
    : pushResult.pushResult.error;
</script>
