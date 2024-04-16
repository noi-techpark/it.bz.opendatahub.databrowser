// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { DatasetPage } from '../../../routes';
import { ViewKey } from '../config/types';

export const computeViewKey = (
  name: string | undefined
): ViewKey | undefined => {
  switch (name) {
    case DatasetPage.DETAIL:
      return 'detail';
    case DatasetPage.EDIT:
      return 'edit';
    case DatasetPage.NEW:
      return 'new';
    case DatasetPage.RAW:
      return 'raw';
    case DatasetPage.TABLE:
      return 'table';
    default:
      return undefined;
  }
};
export const useComputeViewKey = (name: MaybeRef<string | undefined>) =>
  computed(() => computeViewKey(toValue(name)));
