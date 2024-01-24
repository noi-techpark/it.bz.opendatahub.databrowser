// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
  InternalAxiosRequestConfig,
} from 'axios';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useAuth } from '../auth/store/auth';
import { useDatasetBaseInfoStore } from '../datasets/config/store/datasetBaseInfoStore';

export const buildAuthInterceptor = () => {
  const addAuthToCtx = (
    ctx: AxiosRequestConfig,
    authenticated: boolean,
    accessToken: string | null
  ) => {
    if (authenticated) {
      ctx.headers = {
        ...ctx.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  };

  const { datasetDomain } = storeToRefs(useDatasetBaseInfoStore());
  const { ready, isAuthenticated, accessToken } = storeToRefs(useAuth());

  return async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // At the moment, only tourism domain auth is supported.
    // For all other domains, we don't add auth information.
    if (datasetDomain.value === 'tourism') {
      return new Promise((resolve) => {
        watch(
          ready,
          (ready) => {
            if (ready) {
              addAuthToCtx(config, isAuthenticated.value, accessToken.value);
              resolve(config);
            }
          },
          { immediate: true }
        );
      });
    }

    return Promise.resolve(config);
  };
};

export const wrapAxiosFetchWithAuth = async (axiosInstance: AxiosInstance) => {
  const authInfo = await buildAuthInterceptor();
  // Create new axios instance because we add an interceptor
  // that should be used only for this request
  // Note that due to a bug in axios, we need to cast the instance
  const axios = (axiosInstance as AxiosStatic).create() as AxiosInstance;
  axios.interceptors.request.use(authInfo);
  return axios;
};

export const axiosWithMaybeAuth = async (withAuth?: boolean) => {
  return withAuth ? await wrapAxiosFetchWithAuth(axios) : axios;
};
