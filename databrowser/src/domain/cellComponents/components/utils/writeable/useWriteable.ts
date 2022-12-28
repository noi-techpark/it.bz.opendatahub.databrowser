import { computed, Ref } from 'vue';

export const useWriteable = ({
  editable,
  readonly,
}: {
  editable?: Ref<boolean | undefined> | undefined;
  readonly?: Ref<string | boolean | undefined> | undefined;
}) =>
  computed(() => {
    const isEditable = toBool(editable?.value);
    const isReadonly = toBool(readonly?.value);

    const hasEditable = isEditable != null;
    const hasReadonly = isReadonly != null;

    if (!hasEditable && !hasReadonly) {
      return true;
    }

    if (!hasEditable) {
      return !isReadonly;
    }

    if (!hasReadonly) {
      return isEditable;
    }

    return !isReadonly && isEditable;
  });

const toBool = (value: string | boolean | undefined) =>
  typeof value === 'string' ? value.toLowerCase() === 'true' : value;
