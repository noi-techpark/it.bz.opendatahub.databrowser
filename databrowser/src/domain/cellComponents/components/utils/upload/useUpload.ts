import { computed, inject, readonly, Ref, ref } from 'vue';
import { createEventHook } from '@vueuse/core';
import { AxiosError, AxiosInstance } from 'axios';

const imageUploadUrl = import.meta.env.VITE_APP_IMAGE_UPLOAD_URL;
const fileUploadUrl = import.meta.env.VITE_APP_FILE_UPLOAD_URL;

export const useImageUpload = () => useUpload(ref(imageUploadUrl));

export const useFileUpload = () => useUpload(ref(fileUploadUrl));

export const useUploadForType = (type: Ref<'image' | 'file'>) => {
  const url = computed(() =>
    type.value === 'image' ? imageUploadUrl : fileUploadUrl
  );

  return useUpload(url);
};

export const useUpload = (url: Ref<string>) => {
  const axios = inject<AxiosInstance>('axios')!;

  const uploading = ref(false);
  const uploadAbortController = ref(new AbortController());
  const uploadProgress = ref(0);
  const uploadError = ref<string | undefined>();
  const isUploadError = ref(false);
  const isUploadSuccess = ref(false);
  const uploadResponse = ref<string[]>([]);

  // Callbacks for error and success
  const uploadSuccessEventHook = createEventHook<string[]>();
  const uploadErrorEventHook = createEventHook<string>();

  const uploadFiles = async (filesToUpload: File[]) => {
    const formData = new FormData();
    filesToUpload.forEach((file) => formData.append(file.name, file));

    uploadAbortController.value = new AbortController();
    uploadProgress.value = 0;
    uploading.value = true;
    uploadError.value = undefined;
    isUploadError.value = false;
    isUploadSuccess.value = false;

    const onUploadProgress = (progressEvent: any) => {
      uploadProgress.value = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
    };

    try {
      const response = await axios.post<string | string[]>(
        url.value,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: uploadAbortController.value.signal,
          onUploadProgress,
        }
      );

      console.debug('Upload success', response);
      const fileUrls = Array.isArray(response.data)
        ? response.data
        : [response.data];

      isUploadSuccess.value = true;
      uploadResponse.value = fileUrls;
      uploadSuccessEventHook.trigger(uploadResponse.value);
    } catch (error) {
      isUploadError.value = true;
      const errorMessage = extractErrorMessage(error);
      uploadError.value = errorMessage;
      uploadErrorEventHook.trigger(uploadError.value);
    } finally {
      uploading.value = false;
    }
  };

  return {
    isUploadError: readonly(isUploadError),
    isUploadSuccess: readonly(isUploadSuccess),
    uploading: readonly(uploading),
    uploadAbortController: readonly(uploadAbortController),
    uploadError: readonly(uploadError),
    uploadProgress: readonly(uploadProgress),
    uploadResponse: readonly(uploadResponse),
    uploadFiles,
    onUploadSuccess: uploadSuccessEventHook.on,
    onUploadError: uploadErrorEventHook.on,
  };
};

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof AxiosError) {
    const { request, response } = error;
    if (response) {
      const data = response.data != null ? response.data : 'unknown';
      return `Error (status ${
        response.status
      }), response data: ${JSON.stringify(data)}`;
    } else if (request) {
      return `Error, no response, request: ${JSON.stringify(request)}`;
    }
    return `Error, message: ${error.message}`;
  }
  return `Error, details: ${JSON.stringify(error)})`;
};
