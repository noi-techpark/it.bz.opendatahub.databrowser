// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { CellComponent } from '../../../../cellComponents/types';
import { ObjectMapping } from '../../../config/types';
import { ViewConfigWithType, isTableViewConfig } from '../../../view/types';
import { Column } from '../types';
import { useTableViewColsStore } from '../tableViewColsStore';

const firstPropertyName = (objectMapping?: ObjectMapping) => {
  const values = Object.values(objectMapping ?? {});
  return values.length === 1 ? values[0] : undefined;
};

export const computeTableCols = (
  isLoading: boolean,
  view: ViewConfigWithType | undefined
): Column[] => {
  if (!isTableViewConfig(view)) {
    return [];
  }

  return view.elements.map<Column>((element) => {
    const firstPropertyPath = firstPropertyName(element.objectMapping);
    return {
      ...element,
      firstPropertyPath,
      component: isLoading ? CellComponent.LoadingCell : element.component,
    };
  });
};

export const useTableCols = (
  isLoading: MaybeRef<boolean>,
  view: MaybeRef<ViewConfigWithType | undefined>
) =>
  computed(() => {
    const cols = computeTableCols(toValue(isLoading), toValue(view));
    useTableViewColsStore().cols = cols;
    return cols;
  });
