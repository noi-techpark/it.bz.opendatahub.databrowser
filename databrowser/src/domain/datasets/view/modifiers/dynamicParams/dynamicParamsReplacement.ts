// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  DatasetDomain,
  ListElements,
  PropertyConfig,
} from '../../../config/types';
import {
  DetailViewConfigWithType,
  EditViewConfigWithType,
  ListViewConfigWithType,
  NewViewConfigWithType,
  ObjectValueReplacer,
  QuickViewConfigWithType,
  StringReplacer,
  ViewConfigWithType,
} from '../../types';

export const computeDynamicParamsReplacement = (
  datasetDomain: DatasetDomain | undefined,
  view: ViewConfigWithType | undefined,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): ViewConfigWithType | undefined => {
  if (datasetDomain == null || view == null) {
    return undefined;
  }

  if (datasetDomain !== 'tourism') {
    return view;
  }

  switch (view.type) {
    case 'table': {
      return applyReplacementsToTableView(view, objectValueReplacer);
    }
    case 'detail':
      return applyReplacementsToSingleRecordView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'edit':
      return applyReplacementsToSingleRecordView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'new':
      return applyReplacementsToSingleRecordView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'quick':
      return applyReplacementsToQuickView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'raw':
      return view;
  }
};

export const useDynamicParamsReplacement = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  view: MaybeRef<ViewConfigWithType | undefined>,
  stringReplacer: MaybeRef<StringReplacer>,
  objectValueReplacer: MaybeRef<ObjectValueReplacer>
) =>
  computed(() =>
    computeDynamicParamsReplacement(
      toValue(datasetDomain),
      toValue(view),
      toValue(stringReplacer),
      toValue(objectValueReplacer)
    )
  );

const applyReplacementsToTableView = (
  view: ListViewConfigWithType,
  objectValueReplacer: ObjectValueReplacer
): ListViewConfigWithType | undefined => ({
  ...view,
  elements: view.elements.map<ListElements>((element) => {
    const objectMapping = objectValueReplacer(element.objectMapping);
    return {
      ...element,
      objectMapping,
      arrayMapping: undefined,
    };
  }),
});

const applyReplacementsToQuickView = (
  view: QuickViewConfigWithType,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): QuickViewConfigWithType | undefined => ({
  ...view,
  elements: view.elements.map((element) =>
    replaceMappings(
      element as PropertyConfig,
      stringReplacer,
      objectValueReplacer
    )
  ),
});

const applyReplacementsToSingleRecordView = <
  T extends
    | DetailViewConfigWithType
    | NewViewConfigWithType
    | EditViewConfigWithType
>(
  view: T,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): T | undefined => ({
  ...view,
  elements: view.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  })),
});

const replaceMappings = (
  property: PropertyConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
) => {
  if (property.objectMapping != null) {
    return {
      ...property,
      arrayMapping: undefined,
      objectMapping: objectValueReplacer(property.objectMapping),
    };
  } else if (property.arrayMapping != null) {
    return {
      ...property,
      objectMapping: undefined,
      arrayMapping: {
        ...property.arrayMapping,
        pathToParent: stringReplacer(property.arrayMapping.pathToParent),
        objectMapping: objectValueReplacer(property.arrayMapping.objectMapping),
      },
    };
  }
  return property;
};
