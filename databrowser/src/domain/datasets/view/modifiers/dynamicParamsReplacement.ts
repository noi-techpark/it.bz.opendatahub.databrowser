// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  ObjectValueReplacer,
  StringReplacer,
} from '../../../datasetConfig/replace/types';
import {
  DetailViewConfig,
  EditViewConfig,
  ListElements,
  ListViewConfig,
  NewViewConfig,
  ObjectMapping,
  PropertyConfig,
  QuickViewConfig,
  ViewConfig,
  ViewKey,
  ViewValue,
} from '../../../datasetConfig/types';

export const computeDynamicParamsReplacement = (
  views: ViewValue | undefined,
  viewKey: ViewKey | undefined,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): ViewConfig | undefined => {
  if (views == null || viewKey == null) {
    return undefined;
  }

  switch (viewKey) {
    case 'table': {
      return applyReplacementsToTableView(views, objectValueReplacer);
    }
    case 'detail':
      return applyReplacementsToDetailView(
        views,
        stringReplacer,
        objectValueReplacer
      );
    case 'edit':
      return applyReplacementsToEditView(
        views,
        stringReplacer,
        objectValueReplacer
      );
    case 'new':
      return applyReplacementsToNewView(
        views,
        stringReplacer,
        objectValueReplacer
      );
    case 'quick':
      return applyReplacementsToQuickView(
        views,
        stringReplacer,
        objectValueReplacer
      );
    case 'raw':
      return views.raw;
  }
};

export const useDynamicParamsReplacement = (
  views: MaybeRef<ViewValue | undefined>,
  viewKey: MaybeRef<ViewKey | undefined>,
  stringReplacer: MaybeRef<StringReplacer>,
  objectValueReplacer: MaybeRef<ObjectValueReplacer>
) =>
  computed(() =>
    computeDynamicParamsReplacement(
      toValue(views),
      toValue(viewKey),
      toValue(stringReplacer),
      toValue(objectValueReplacer)
    )
  );

export const applyReplacementsToTableView = (
  views: ViewValue,
  objectValueReplacer: ObjectValueReplacer
): ListViewConfig | undefined => {
  console.log('computeTableView');

  const tableViewConfig = views.table;
  if (tableViewConfig == null) {
    return undefined;
  }

  const firstPropertyName = (objectMapping?: ObjectMapping) => {
    const values = Object.values(objectMapping ?? {});
    return values.length === 1 ? values[0] : undefined;
  };

  const result = {
    ...tableViewConfig,
    elements: tableViewConfig.elements.map<ListElements>((element) => {
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
  views: ViewValue,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): DetailViewConfig | undefined => {
  console.log('computeDetailView');

  const detailViewConfig = views?.detail;
  if (detailViewConfig == null) {
    return;
  }

  const elements = detailViewConfig.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...detailViewConfig, elements };
};

export const applyReplacementsToEditView = (
  views: ViewValue,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): EditViewConfig | undefined => {
  console.log('computeEditView');

  const editViewConfig = views?.edit;
  if (editViewConfig == null) {
    return;
  }

  const elements = editViewConfig.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...editViewConfig, elements };
};

export const applyReplacementsToNewView = (
  views: ViewValue,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): NewViewConfig | undefined => {
  console.log('computeNewView');

  const newViewConfig = views?.new;
  if (newViewConfig == null) {
    return;
  }

  const elements = newViewConfig.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) =>
        replaceMappings(property, stringReplacer, objectValueReplacer)
      ),
    })),
  }));

  return { ...newViewConfig, elements };
};

export const applyReplacementsToQuickView = (
  views: ViewValue,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = views?.quick;
  if (quickViewConfig == null) {
    return;
  }

  const elements = quickViewConfig.elements.map((element) =>
    replaceMappings(
      element as PropertyConfig,
      stringReplacer,
      objectValueReplacer
    )
  );

  return { ...quickViewConfig, elements };
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
