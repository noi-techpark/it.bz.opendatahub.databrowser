// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { ViewValue, ViewKey } from '../../../config/types';
import { ViewConfigWithType } from '../../types';

export const extractView = (
  baseViews: ViewValue | undefined,
  viewKey: ViewKey | undefined
): ViewConfigWithType | undefined => {
  const viewKeyValue = toValue(viewKey);
  const baseViewsValue = toValue(baseViews);
  if (viewKeyValue == null || baseViewsValue == null) {
    return undefined;
  }
  return {
    ...baseViewsValue[viewKeyValue],
    // Need to cast to any because TypeScript doesn't know that the view and type actually match
    type: viewKeyValue as any,
  };
};

export const useExtractView = (
  baseViews: MaybeRef<ViewValue | undefined>,
  viewKey: MaybeRef<ViewKey | undefined>
) => computed(() => extractView(toValue(baseViews), toValue(viewKey)));
