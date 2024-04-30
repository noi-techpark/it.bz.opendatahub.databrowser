// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { formatDistanceToNow, format as formatFn } from 'date-fns';
import { MaybeRef, computed, toValue } from 'vue';
import {
  DEFAULT_DATE_TIME_FORMAT,
  withOdhBaseUrl,
} from '../../../../../config/utils';
import { useApiRead } from '../../../../api/useApi';
import { WithTourismPagination } from '../../../../datasets/pagination/types';
import { OdhPushResponse, PushResponseData } from './types';

// Send push notifications to publishers
export const useLastPushResponse = (id: MaybeRef<string | undefined>) => {
  const url = computed(() => {
    const idValue = toValue(id);
    return idValue == null
      ? undefined
      : // Fetch last push info for the given id
        withOdhBaseUrl(
          `/v1/PushResponse?pagesize=1&pagenumber=1&rawsort=-Date&rawfilter=and(eq(PushObject.Id,'${idValue}'))`
        );
  });

  const { data, error, isLoading, isError, refetch } =
    useApiRead<WithTourismPagination<OdhPushResponse>>(url);

  const pushResponse = computed<PushResponseData>(() => {
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

  return { pushResponse, error, isLoading, isError, refetch };
};

const buildDateInfo = (dateAsString: string | undefined) => {
  if (dateAsString == null) {
    return {
      date: undefined,
      dateAgo: undefined,
      dateFormatted: 'unknown',
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
