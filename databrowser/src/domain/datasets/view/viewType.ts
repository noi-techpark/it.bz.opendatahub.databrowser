// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { ViewConfigWithType } from './types';

interface ComputeViewType {
  isTableView: boolean;
  isDetailView: boolean;
  isEditView: boolean;
  isNewView: boolean;
  isRawView: boolean;
}

export const computeViewType = (
  view: ViewConfigWithType | undefined
): ComputeViewType => ({
  isTableView: view?.type === 'table',
  isDetailView: view?.type === 'detail',
  isEditView: view?.type === 'edit',
  isNewView: view?.type === 'new',
  isRawView: view?.type === 'raw',
});

export const useComputeViewType = (
  viewKey: MaybeRef<ViewConfigWithType | undefined>
): ToRefs<ComputeViewType> => {
  const result = reactiveComputed(() => computeViewType(toValue(viewKey)));

  return toRefs(result);
};
