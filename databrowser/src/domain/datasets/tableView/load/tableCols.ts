// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  ListElements,
  ListViewConfig,
  ViewConfig,
} from '../../../datasetConfig/types';
import { CellComponent } from '../../../cellComponents/types';

export const computeTableCols = (
  isLoading: boolean,
  view: ViewConfig | undefined
) => {
  if (view == null) {
    return [];
  }

  const listView = view as ListViewConfig;
  if (!isLoading) {
    return listView.elements;
  }

  return listView.elements.map<ListElements>((col) => ({
    title: col.title,
    component: CellComponent.LoadingCell,
    propertyMappings: {},
    class: col.class,
  }));
};

export const useTableCols = (
  isLoading: MaybeRef<boolean>,
  view: MaybeRef<ViewConfig | undefined>
) => computed(() => computeTableCols(toValue(isLoading), toValue(view)));