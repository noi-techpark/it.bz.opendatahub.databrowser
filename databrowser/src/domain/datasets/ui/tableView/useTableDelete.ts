// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { watch, ref, Ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { useApiMutate } from '../../../api/useApi';

export const useEventDelete = useEventBus<string | undefined>('delete');

export const useTableDelete = (
  fullPath: Ref<string | undefined>,
  refetch: () => void
) => {
  const deleteDialog = ref({
    // NOTE: idsToDelete set as array to facilitate further implementations
    idsToDelete: [] as string[],
    isVisible: false,
  });

  const deleteUrl = ref();

  const {
    isSuccess: isMutateSuccess,
    mutate,
    isPending: isDeleting,
  } = useApiMutate(deleteUrl, {
    method: 'delete',
  });

  watch(
    () => isMutateSuccess.value,
    (newValue: boolean) => {
      if (newValue) {
        closeDeleteConfirmation();
        refetch();
      }
    }
  );

  useEventDelete.on((id: string | undefined) => {
    if (id) {
      openDeleteConfirmation(id);
    }
  });

  const openDeleteConfirmation = (id: string) => {
    deleteDialog.value.isVisible = true;
    deleteDialog.value.idsToDelete = [id];
  };

  const closeDeleteConfirmation = () => {
    deleteDialog.value.isVisible = false;
    deleteDialog.value.idsToDelete = [];
  };

  const onDelete = async () => {
    const currentBaseUrl = fullPath.value?.split('?')[0];
    for (const idToDelete of deleteDialog.value.idsToDelete) {
      deleteUrl.value = `${currentBaseUrl}/${idToDelete}`;

      mutate({});
    }
  };

  return {
    deleteDialog,
    onDelete,
    isDeleting,
    closeDeleteConfirmation,
  };
};
