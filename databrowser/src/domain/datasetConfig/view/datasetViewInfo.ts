// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { DatasetPage } from '../../../routes';
import { reactiveComputed } from '@vueuse/core';
import { ViewKey } from '../types';

interface ComputeViewType {
  isTableView: boolean;
  isDetailView: boolean;
  isEditView: boolean;
  isNewView: boolean;
  isQuickView: boolean;
  isRawView: boolean;
  viewKey: ViewKey | undefined;
}

export const computeDatasetViewInfo = (
  name: string | Symbol | null | undefined
): ComputeViewType => ({
  isTableView: name === DatasetPage.TABLE,
  isDetailView: name === DatasetPage.DETAIL,
  isEditView: name === DatasetPage.EDIT,
  isNewView: name === DatasetPage.NEW,
  isQuickView: name === DatasetPage.QUICK,
  isRawView: name === DatasetPage.RAW,
  viewKey: computeViewKey(name),
});

export const useComputeDatasetViewInfo = (
  name: MaybeRef<string | Symbol | null | undefined>
): ToRefs<ComputeViewType> => {
  const result = reactiveComputed(() => computeDatasetViewInfo(toValue(name)));

  return toRefs(result);
};

export const computeViewKey = (
  name: string | Symbol | null | undefined
): ViewKey | undefined => {
  switch (name) {
    case DatasetPage.DETAIL:
      return 'detail';
    case DatasetPage.EDIT:
      return 'edit';
    case DatasetPage.NEW:
      return 'new';
    case DatasetPage.QUICK:
      return 'quick';
    case DatasetPage.RAW:
      return 'raw';
    case DatasetPage.TABLE:
      return 'table';
    default:
      return undefined;
  }
};
