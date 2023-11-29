// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  DatasetConfig,
  DetailViewConfig,
  EditViewConfig,
  ListElements,
  ListViewConfig,
  NewViewConfig,
  ObjectMapping,
  PropertyConfig,
  QuickViewConfig,
  ToMaybeRefs,
  ViewConfig,
  ViewKey,
} from '../types';
import { computed, toValue } from 'vue';
import { StringReplacer, ObjectValueReplacer } from '../replace/types';

interface ComputeDatasetReplacementParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  stringReplacer: StringReplacer;
  objectValueReplacer: ObjectValueReplacer;
}

export const computeView = ({
  datasetConfig,
  viewKey,
  stringReplacer,
  objectValueReplacer,
}: ComputeDatasetReplacementParams): ViewConfig | undefined => {
  if (viewKey == null || datasetConfig == null) {
    return undefined;
  }

  return applyReplacementsToView(
    viewKey,
    datasetConfig,
    stringReplacer,
    objectValueReplacer
  );
};

export const useComputeView = (
  params: ToMaybeRefs<ComputeDatasetReplacementParams>
) =>
  computed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const stringReplacer = toValue(params.stringReplacer);
    const objectValueReplacer = toValue(params.objectValueReplacer);

    return computeView({
      datasetConfig,
      viewKey,
      stringReplacer,
      objectValueReplacer,
    });
  });

export const applyReplacementsToView = (
  viewKey: ViewKey,
  config: DatasetConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): ViewConfig | undefined => {
  switch (viewKey) {
    case 'table':
      return applyReplacementsToTableView(config, objectValueReplacer);
    case 'detail':
      return applyReplacementsToDetailView(
        config,
        stringReplacer,
        objectValueReplacer
      );
    case 'edit':
      return applyReplacementsToEditView(
        config,
        stringReplacer,
        objectValueReplacer
      );
    case 'new':
      return applyReplacementsToNewView(
        config,
        stringReplacer,
        objectValueReplacer
      );
    case 'quick':
      return applyReplacementsToQuickView(
        config,
        stringReplacer,
        objectValueReplacer
      );
    case 'raw':
      return config.views?.raw;
  }
};

export const applyReplacementsToTableView = (
  config: DatasetConfig,
  objectValueReplacer: ObjectValueReplacer
): ListViewConfig | undefined => {
  console.log('computeTableView');

  const tableViewConfig = config.views?.table;
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
  config: DatasetConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): DetailViewConfig | undefined => {
  console.log('computeDetailView');

  const detailViewConfig = config.views?.detail;
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
  config: DatasetConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): EditViewConfig | undefined => {
  console.log('computeEditView');

  const editViewConfig = config.views?.edit;
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
  config: DatasetConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): NewViewConfig | undefined => {
  console.log('computeNewView');

  const newViewConfig = config.views?.new;
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
  config: DatasetConfig,
  stringReplacer: StringReplacer,
  objectValueReplacer: ObjectValueReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = config.views?.quick;
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
