import { inject, provide, readonly, Ref } from 'vue';

export const useEditMode = (editable: Ref<boolean>) => {
  return {
    editable: readonly(editable),
  };
};

type EditMode = ReturnType<typeof useEditMode>;

const editModeKey = Symbol('edit-mode-key');

export const useProvideEditMode = (editable: Ref<boolean>) => {
  const editMode = useEditMode(editable);
  provide(editModeKey, editMode);
  return editMode;
};

export const useInjectEditMode = () => inject<EditMode>(editModeKey)!;
