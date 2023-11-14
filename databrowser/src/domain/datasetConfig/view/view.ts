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
  ObjectMappings,
  PropertyConfig,
  QuickViewConfig,
  ToMaybeRefs,
  ViewConfig,
  ViewKey,
} from '../types';
import { computed, toValue } from 'vue';
import { ParamsReplacer, PropertyPathReplacer } from '../replace/types';

interface ComputeDatasetReplacementParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  paramsReplacer: ParamsReplacer;
  propertyPathReplacer: PropertyPathReplacer;
}

export const computeView = ({
  datasetConfig,
  viewKey,
  paramsReplacer,
  propertyPathReplacer,
}: ComputeDatasetReplacementParams): ViewConfig | undefined => {
  if (viewKey == null || datasetConfig == null) {
    return undefined;
  }

  return applyReplacementsToView(
    viewKey,
    datasetConfig,
    paramsReplacer,
    propertyPathReplacer
  );
};

export const useComputeView = (
  params: ToMaybeRefs<ComputeDatasetReplacementParams>
) =>
  computed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const paramsReplacer = toValue(params.paramsReplacer);
    const propertyPathReplacer = toValue(params.propertyPathReplacer);

    return computeView({
      datasetConfig,
      viewKey,
      paramsReplacer,
      propertyPathReplacer,
    });
  });

export const applyReplacementsToView = (
  viewKey: ViewKey,
  config: DatasetConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
): ViewConfig | undefined => {
  switch (viewKey) {
    case 'table':
      return applyReplacementsToTableView(config, propertyPathReplacer);
    case 'detail':
      return applyReplacementsToDetailView(
        config,
        paramsReplacer,
        propertyPathReplacer
      );
    case 'edit':
      return applyReplacementsToEditView(
        config,
        paramsReplacer,
        propertyPathReplacer
      );
    case 'new':
      return applyReplacementsToNewView(
        config,
        paramsReplacer,
        propertyPathReplacer
      );
    case 'quick':
      return applyReplacementsToQuickView(
        config,
        paramsReplacer,
        propertyPathReplacer
      );
    case 'raw':
      return config.views?.raw;
  }
};

export const applyReplacementsToTableView = (
  config: DatasetConfig,
  propertyPathReplacer: PropertyPathReplacer
): ListViewConfig | undefined => {
  console.log('computeTableView');

  const tableViewConfig = config.views?.table;
  if (tableViewConfig == null) {
    return undefined;
  }

  const firstPropertyName = (objectMappings?: ObjectMappings) => {
    const values = Object.values(objectMappings ?? {});
    return values.length === 1 ? values[0] : undefined;
  };

  const result = {
    ...tableViewConfig,
    elements: tableViewConfig.elements.map<ListElements>((element) => {
      const objectMappings = propertyPathReplacer(element.objectMappings);
      const propertyName = firstPropertyName(objectMappings);
      return {
        ...element,
        objectMappings: objectMappings,
        propertyPath: propertyName,
        listFields: undefined,
      };
    }),
  };

  console.timeEnd('datasetConfig table view config');
  console.groupEnd();

  return result;
};

export const applyReplacementsToDetailView = (
  config: DatasetConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
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
        replaceMappings(property, paramsReplacer, propertyPathReplacer)
      ),
    })),
  }));

  return { ...detailViewConfig, elements };
};

export const applyReplacementsToEditView = (
  config: DatasetConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
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
        replaceMappings(property, paramsReplacer, propertyPathReplacer)
      ),
    })),
  }));

  return { ...editViewConfig, elements };
};

export const applyReplacementsToNewView = (
  config: DatasetConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
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
        replaceMappings(property, paramsReplacer, propertyPathReplacer)
      ),
    })),
  }));

  return { ...newViewConfig, elements };
};

export const applyReplacementsToQuickView = (
  config: DatasetConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = config.views?.quick;
  if (quickViewConfig == null) {
    return;
  }

  const elements = quickViewConfig.elements.map((element) =>
    replaceMappings(
      element as PropertyConfig,
      paramsReplacer,
      propertyPathReplacer
    )
  );

  return { ...quickViewConfig, elements };
};

const replaceMappings = (
  property: PropertyConfig,
  paramsReplacer: ParamsReplacer,
  propertyPathReplacer: PropertyPathReplacer
) => {
  if (property.objectMappings != null) {
    return {
      ...property,
      listFields: undefined,
      objectMappings: propertyPathReplacer(property.objectMappings),
    };
  } else if (property.listFields != null) {
    return {
      ...property,
      objectMappings: undefined,
      listFields: {
        ...property.listFields,
        pathToParent: paramsReplacer(property.listFields.pathToParent),
        objectMappings: propertyPathReplacer(
          property.listFields.objectMappings
        ),
      },
    };
  }
  return property;
};
