// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { DatasetPage } from '../../../routes';
import { reactiveComputed } from '@vueuse/core';

interface ComputeViewType {
  isTableView: boolean;
  isDetailView: boolean;
  isEditView: boolean;
  isNewView: boolean;
  isQuickView: boolean;
  isRawView: boolean;
}

export const computeViewType = (name: string | undefined): ComputeViewType => ({
  isTableView: name === DatasetPage.TABLE,
  isDetailView: name === DatasetPage.DETAIL,
  isEditView: name === DatasetPage.EDIT,
  isNewView: name === DatasetPage.NEW,
  isQuickView: name === DatasetPage.QUICK,
  isRawView: name === DatasetPage.RAW,
});

export const useComputeViewType = (
  name: MaybeRef<string | undefined>
): ToRefs<ComputeViewType> => {
  const result = reactiveComputed(() => computeViewType(toValue(name)));

  return toRefs(result);
};
