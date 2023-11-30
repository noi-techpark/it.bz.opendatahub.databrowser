// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { ViewValue } from '../config/types';

interface ComputeViewPresence {
  hasTableView: boolean;
  hasEditView: boolean;
  hasNewView: boolean;
  hasDetailView: boolean;
  hasQuickView: boolean;
  hasRawView: boolean;
}

export const computeViewPresence = (
  views: ViewValue | undefined
): ComputeViewPresence => ({
  hasTableView: views?.table != null,
  hasDetailView: views?.detail != null,
  hasEditView: views?.edit != null,
  hasNewView: views?.new != null,
  hasQuickView: views?.quick != null,
  hasRawView: views?.raw != null,
});

export const useComputeViewPresence = (
  views: MaybeRef<ViewValue | undefined>
): ToRefs<ComputeViewPresence> => {
  const result = reactiveComputed(() => computeViewPresence(toValue(views)));

  return toRefs(result);
};
