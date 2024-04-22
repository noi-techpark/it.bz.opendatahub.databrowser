// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithMaybeAuth } from '../../../../api/apiAuth';
import {
  OdhPushResponseMany,
  Publisher,
  PublisherWithPushResult,
} from './types';

type PushNotificationResponse = AxiosResponse<OdhPushResponseMany>;

// Send push notifications to publishers
export const sendPushNotifications = async (publishers: Publisher[]) => {
  // Get the axios instance with authentication
  const axios = await axiosWithMaybeAuth(true);

  const mutatePromises: Promise<PushNotificationResponse>[] = [];

  // Send push notifications to publishers
  publishers.forEach((publisher) => {
    const pushPromise = axios<OdhPushResponseMany>({
      url: publisher.url,
      method: 'post',
    });
    mutatePromises.push(pushPromise);
  });

  // Wait for all push notifications to be sent and build the result
  return Promise.allSettled(mutatePromises).then((response) =>
    publishers.map<PublisherWithPushResult>((publisher, index) =>
      buildPushResult(publisher, response[index])
    )
  );
};

const buildPushResult = (
  publisher: Publisher,
  promiseResult: PromiseSettledResult<PushNotificationResponse>
): PublisherWithPushResult => {
  // Handle request errors
  if (promiseResult.status === 'rejected') {
    const error = getErrorMessage(promiseResult.reason);
    return {
      ...publisher,
      pushResult: {
        success: false,
        error,
      },
    };
  }

  // Get the push notification result
  const result = promiseResult.value.data[publisher.id];
  return {
    ...publisher,
    pushResult: {
      id: result.Id,
      date: result.Date,
      success: result.Result.Success,
      error: result.Result.Success ? undefined : result.Result.Response,
    },
  };
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return `(${error.response?.status}) ${error.response?.statusText}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};
