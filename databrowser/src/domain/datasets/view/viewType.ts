// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { ViewKey } from '../../datasetConfig/types';

interface ComputeViewType {
  isTableView: boolean;
  isDetailView: boolean;
  isEditView: boolean;
  isNewView: boolean;
  isQuickView: boolean;
  isRawView: boolean;
}

export const computeViewType = (
  viewKey: ViewKey | undefined
): ComputeViewType => ({
  isTableView: viewKey === 'table',
  isDetailView: viewKey === 'detail',
  isEditView: viewKey === 'edit',
  isNewView: viewKey === 'new',
  isQuickView: viewKey === 'quick',
  isRawView: viewKey === 'raw',
});

export const useComputeViewType = (
  viewKey: MaybeRef<ViewKey | undefined>
): ToRefs<ComputeViewType> => {
  const result = reactiveComputed(() => computeViewType(toValue(viewKey)));

  return toRefs(result);
};
