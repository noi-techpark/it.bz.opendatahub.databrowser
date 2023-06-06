// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosInstance } from 'axios';
import { computed, inject, ref, Ref } from 'vue';
import { useMutation } from 'vue-query';

type Mutation = 'create' | 'update' | 'delete';

const buildUseMutation = (
  axios: AxiosInstance,
  url: Ref<string>,
  method: Ref<string>
) => {
  const useRequestMutation = () =>
    useMutation((data?: unknown) => {
      if (url.value == null) {
        return Promise.reject(
          `Dataset current path is empty, can not mutate (${method.value.toUpperCase()}) dataset`
        );
      }

      return axios.request({ url: url.value, method: method.value, data });
    });

  const mutation = useRequestMutation();

  const invoke = (data?: unknown) => {
    console.debug(`Mutate remote data (${method.value.toUpperCase()})`);
    mutation.mutate(data);
  };

  return { ...mutation, invoke };
};

export const useApiUpdate = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, ref('put'));
  return {
    isUpdateSuccess: mut.isSuccess,
    isUpdateError: mut.isError,
    isUpdateIdle: mut.isIdle,
    isUpdateLoading: mut.isLoading,
    isUpdatePaused: mut.isPaused,
    updateData: mut.data,
    updateError: mut.error,
    resetUpdate: mut.reset,
    update: mut.invoke,
  };
};

export const useApiCreate = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, ref('post'));
  return {
    isCreateSuccess: mut.isSuccess,
    isCreateError: mut.isError,
    isCreateIdle: mut.isIdle,
    isCreateLoading: mut.isLoading,
    isCreatePaused: mut.isPaused,
    createData: mut.data,
    createError: mut.error,
    resetCreate: mut.reset,
    create: mut.invoke,
  };
};

export const useApiDelete = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, ref('delete'));
  return {
    isDeleteSuccess: mut.isSuccess,
    isDeleteError: mut.isError,
    isDeleteIdle: mut.isIdle,
    isDeleteLoading: mut.isLoading,
    isDeletePaused: mut.isPaused,
    deleteData: mut.data,
    deleteError: mut.error,
    resetDelete: mut.reset,
    delete: mut.invoke as () => void,
  };
};

export const useApiMutate = (url: Ref<string>, mutation: Ref<Mutation>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const method = mutationToMethod(mutation);
  const mut = buildUseMutation(axios, url, method);
  return {
    isMutateSuccess: mut.isSuccess,
    isMutateError: mut.isError,
    isMutateIdle: mut.isIdle,
    isMutateLoading: mut.isLoading,
    isMutatePaused: mut.isPaused,
    mutateData: mut.data,
    mutateError: mut.error,
    resetMutate: mut.reset,
    mutate: mut.invoke as () => void,
  };
};

const mutationToMethod = (mutation: Ref<Mutation>) =>
  computed<string>(() => {
    switch (mutation.value) {
      case 'create':
        return 'post';
      case 'update':
        return 'put';
      case 'delete':
        return 'delete';
      default:
        return 'unknown';
    }
  });
