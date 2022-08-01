import { AxiosInstance } from 'axios';
import { inject, Ref } from 'vue';
import { useMutation } from 'vue-query';

const buildUseMutation = (
  axios: AxiosInstance,
  url: Ref<string>,
  method: string
) => {
  const useRequestMutation = () =>
    useMutation((data?: unknown) => {
      if (url.value == null) {
        return Promise.reject(
          `Dataset current path is empty, can not mutate (${method.toUpperCase()}) dataset`
        );
      }

      return axios.request({ url: url.value, method, data });
    });

  const mutation = useRequestMutation();

  const invoke = (data?: unknown) => {
    console.debug(`Mutate remote data (${method.toUpperCase()})`);
    mutation.mutate(data);
  };

  return { ...mutation, invoke };
};

export const useApiUpdate = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, 'put');
  return {
    isUpdateSuccess: mut.isSuccess,
    isUpdateError: mut.isError,
    isUpdateIdle: mut.isIdle,
    isUpdateLoading: mut.isLoading,
    isUpdatePaused: mut.isPaused,
    updateError: mut.error,
    reset: mut.reset,
    update: mut.invoke,
  };
};

export const useApiCreate = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, 'post');
  return {
    isCreateSuccess: mut.isSuccess,
    isCreateError: mut.isError,
    isCreateIdle: mut.isIdle,
    isCreateLoading: mut.isLoading,
    isCreatePaused: mut.isPaused,
    createError: mut.error,
    reset: mut.reset,
    create: mut.invoke,
  };
};

export const useApiDelete = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;
  const mut = buildUseMutation(axios, url, 'delete');
  return {
    isDeleteSuccess: mut.isSuccess,
    isDeleteError: mut.isError,
    isDeleteIdle: mut.isIdle,
    isDeleteLoading: mut.isLoading,
    isDeletePaused: mut.isPaused,
    deleteError: mut.error,
    reset: mut.reset,
    delete: mut.invoke as () => void,
  };
};
