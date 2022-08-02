import { Ref, watch } from 'vue';
import { useEditStore } from './store/editStore';
import { EditData } from './store/initialState';

export const useEditStoreSync = (
  data: Ref<any>,
  isUpdateSuccess: Ref<boolean>,
  update: (data?: unknown) => void
) => {
  const editStore = useEditStore();

  watch(
    () => data.value as EditData,
    (dataValue) => {
      if (dataValue == null) {
        return;
      }
      editStore.setInitial({ ...dataValue });
      editStore.setCurrent({ ...dataValue });
    },
    { immediate: true }
  );

  watch(
    () => isUpdateSuccess.value,
    (isSuccessValue) => {
      if (isSuccessValue === true) {
        editStore.setInitial(editStore.current);
      }
    }
  );

  const updateData = () => update(editStore.current);
  const resetData = () => editStore.setCurrent(editStore.initial);

  return { update: updateData, reset: resetData };
};
