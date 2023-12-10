// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  DatasetDomain,
  ListElements,
  ObjectMapping,
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
      return applyReplacementsToDetailView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'edit':
      return applyReplacementsToEditView(
        view,
        stringReplacer,
        objectValueReplacer
      );
    case 'new':
      return applyReplacementsToNewView(
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

export const applyReplacementsToTableView = (
  view: ListViewConfigWithType,
  objectValueReplacer: ObjectValueReplacer
): ListViewConfigWithType | undefined => {
  const firstPropertyName = (objectMapping?: ObjectMapping) => {
    const values = Object.values(objectMapping ?? {});
    return values.length === 1 ? values[0] : undefined;
  };

  const result = {
    ...view,
    elements: view.elements.map<ListElements>((element) => {
      const objectMapping = objectValueReplacer(element.objectMapping);
      const propertyPath = firstPropertyName(objectMapping);
      return {
        ...element,
        objectMapping,
        propertyPath,
        arrayMapping: undefined,
      };
    }),
  };

  return result;
};

export const applyReplacementsToDetailView = (
  view: DetailViewConfigWithType,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): DetailViewConfigWithType | undefined => {
  const elements = view.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...view, elements };
};

export const applyReplacementsToEditView = (
  view: EditViewConfigWithType,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): EditViewConfigWithType | undefined => {
  const elements = view.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...view, elements };
};

export const applyReplacementsToNewView = (
  view: NewViewConfigWithType,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): NewViewConfigWithType | undefined => {
  const elements = view.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...view, elements };
};

export const applyReplacementsToQuickView = (
  view: QuickViewConfigWithType,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): QuickViewConfigWithType | undefined => {
  const elements = view.elements.map((element) =>
    replaceMappings(
      element as PropertyConfig,
      stringReplacer,
      objectValueReplacer
    )
  );

  return { ...view, elements };
};

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
