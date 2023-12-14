// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';

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
