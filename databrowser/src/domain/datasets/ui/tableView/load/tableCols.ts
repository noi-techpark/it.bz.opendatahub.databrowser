// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { CellComponent } from '../../../../cellComponents/types';
import {
  ListElements,
  ListViewConfig,
  ViewConfig,
} from '../../../config/types';

export const computeTableCols = (
  isLoading: boolean,
  view: ViewConfig | undefined
) => {
  if (view == null) {
    return [];
  }

  const listView = view as ListViewConfig;
  return listView.elements.map<ListElements>((element) => ({
    ...element,
    component: isLoading ? CellComponent.LoadingCell : element.component,
  }));
};

export const useTableCols = (
  isLoading: MaybeRef<boolean>,
  view: MaybeRef<ViewConfig | undefined>
) => computed(() => computeTableCols(toValue(isLoading), toValue(view)));
