import { computed, Ref } from 'vue';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';

export const useWriteable = ({
  editable,
  readonly,
}: {
  editable?: Ref<boolean | undefined> | undefined;
  readonly?: Ref<string | boolean | undefined> | undefined;
}) =>
  computed(() => {
    const isEditable = booleanOrStringToBoolean(editable?.value);
    const isReadonly = booleanOrStringToBoolean(readonly?.value);

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
