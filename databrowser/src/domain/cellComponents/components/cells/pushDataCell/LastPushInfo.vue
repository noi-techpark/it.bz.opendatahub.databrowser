<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="id != null" class="mt-2 flex flex-col gap-2">
    <div class="flex flex-col rounded bg-dialog p-2 text-white">
      <div class="flex items-center gap-1">
        <IconExclamationMark class="w-7" />
        <div class="font-semibold">
          {{ t('components.pushData.lastPushInfo.title') }}
        </div>
      </div>
      <div class="ml-8">
        <LoadingIndicator v-if="isLoading" />
        <template v-else>
          <div v-if="pushResponse.state === 'error'">
            {{ pushResponse.message }}
          </div>
          <div v-if="pushResponse.state === 'info'">
            {{ pushResponse.message }}
          </div>
          <div v-if="pushResponse.state === 'ok'">
            <div>
              {{
                t('components.pushData.lastPushInfo.sentAt', {
                  date: pushResponse.dateFormatted,
                })
              }}
            </div>
            <div>
              {{
                t('components.pushData.lastPushInfo.pushResponseId', {
                  id: pushResponse.id,
                })
              }}
            </div>
          </div>
          <div v-if="isError">
            {{ t('components.pushData.lastPushInfo.error', { error }) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow, format as formatFn } from 'date-fns';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LoadingIndicator from '../../../../../components/loading/LoadingIndicator.vue';
import IconExclamationMark from '../../../../../components/svg/IconExclamationMark.vue';
import {
  DEFAULT_DATE_TIME_FORMAT,
  withOdhBaseUrl,
} from '../../../../../config/utils';
import { useApiRead } from '../../../../api/useApi';
import { WithTourismPagination } from '../../../../datasets/pagination/types';
import { OdhPushResponse, PublisherWithPushResult } from './types';

const { t } = useI18n();

const props = defineProps<{
  id?: string;
  pushResults: PublisherWithPushResult[];
}>();

const url = computed(() =>
  props.id == null
    ? undefined
    : // Fetch last push info for the given id
      withOdhBaseUrl(
        `/v1/PushResponse?pagesize=1&pagenumber=1&rawsort=-Date&rawfilter=and(eq(PushObject.Id,'${props.id}'))`
      )
);

const { data, error, isLoading, isError } =
  useApiRead<WithTourismPagination<OdhPushResponse>>(url);

interface PushResponseData {
  state: 'empty' | 'info' | 'ok' | 'error';
  id?: string;
  date?: string;
  dateAgo?: string;
  dateFormatted?: string;
  message?: string;
}

const pushResponse = computed<PushResponseData>(() => {
  // If the push results are available, this means that a push notification has
  // been sent. In this case, we show the information from the first push result.
  if (props.pushResults != null && props.pushResults.length > 0) {
    const pushResult = props.pushResults[0];
    return {
      state: pushResult.pushResult.success ? 'ok' : 'error',
      id: pushResult.pushResult.id,
      ...buildDateInfo(new Date().toISOString()),
    };
  }

  if (data.value == null) {
    return { state: 'empty' };
  }

  if (data.value.TotalResults === 0) {
    return {
      state: 'info',
      message: 'No data available',
    };
  }

  const odhPushResponse = data.value.Items[0];

  return {
    state: 'ok',
    id: odhPushResponse.Id,
    ...buildDateInfo(odhPushResponse.Date),
  };
});

const buildDateInfo = (dateAsString: string | undefined) => {
  if (dateAsString == null) {
    return {
      date: undefined,
      dateAgo: undefined,
      dateFormatted: t('components.pushData.lastPushInfo.sentAtUnknown'),
    };
  }

  const date = new Date(dateAsString);

  const pushResponseDate = formatFn(date, DEFAULT_DATE_TIME_FORMAT);

  const pushResponseDateAgo = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  });

  return {
    date: pushResponseDate,
    dateAgo: pushResponseDateAgo,
    dateFormatted: `${pushResponseDate} (${pushResponseDateAgo})`,
  };
};
</script>
