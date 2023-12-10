// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { CellComponent } from '../../../../cellComponents/types';
import { ListElements } from '../../../config/types';
import { ViewConfigWithType, isTableViewConfig } from '../../../view/types';

export const computeTableCols = (
  isLoading: boolean,
  view: ViewConfigWithType | undefined
) => {
  if (!isTableViewConfig(view)) {
    return [];
  }

  return view.elements.map<ListElements>((element) => ({
    ...element,
    component: isLoading ? CellComponent.LoadingCell : element.component,
  }));
};

export const useTableCols = (
  isLoading: MaybeRef<boolean>,
  view: MaybeRef<ViewConfigWithType | undefined>
) =>
  computed(() => {
    return computeTableCols(toValue(isLoading), toValue(view));
  });
