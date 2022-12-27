import { inject, provide, readonly, Ref } from 'vue';

export const useEditMode = (isEditMode: Ref<boolean>) => {
  return {
    isEditMode: readonly(isEditMode),
  };
};

type EditMode = ReturnType<typeof useEditMode>;

const editModeKey = Symbol('edit-mode-key');

export const useProvideEditMode = (isEditMode: Ref<boolean>) => {
  const editMode = useEditMode(isEditMode);
  provide(editModeKey, editMode);
  return editMode;
};

export const useInjectEditMode = () => inject<EditMode>(editModeKey)!;
