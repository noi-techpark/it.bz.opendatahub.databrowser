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
  QuickViewConfig,
  ToMaybeRefs,
  ViewConfig,
  ViewKey,
} from '../types';
import { computed, toValue } from 'vue';
import { PropertyPathReplacer } from '../replace/types';

interface ComputeDatasetReplacementParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  propertyPathReplacer: PropertyPathReplacer;
}

export const computeView = ({
  datasetConfig,
  viewKey,
  propertyPathReplacer,
}: ComputeDatasetReplacementParams): ViewConfig | undefined => {
  if (viewKey == null || datasetConfig == null) {
    return undefined;
  }

  return applyReplacementsToView(viewKey, datasetConfig, propertyPathReplacer);
};

export const useComputeView = (
  params: ToMaybeRefs<ComputeDatasetReplacementParams>
) =>
  computed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const propertyPathReplacer = toValue(params.propertyPathReplacer);

    return computeView({
      datasetConfig,
      viewKey,
      propertyPathReplacer,
    });
  });

export const applyReplacementsToView = (
  viewKey: ViewKey,
  config: DatasetConfig,
  propertyPathReplacer: PropertyPathReplacer
): ViewConfig | undefined => {
  switch (viewKey) {
    case 'table':
      return applyReplacementsToTableView(config, propertyPathReplacer);
    case 'detail':
      return applyReplacementsToDetailView(config, propertyPathReplacer);
    case 'edit':
      return applyReplacementsToEditView(config, propertyPathReplacer);
    case 'new':
      return applyReplacementsToNewView(config, propertyPathReplacer);
    case 'quick':
      return applyReplacementsToQuickView(config, propertyPathReplacer);
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
  propertyPathReplacer: PropertyPathReplacer
): DetailViewConfig | undefined => {
  console.log('computeTableView');

  const detailViewConfig = config.views?.detail;
  if (detailViewConfig == null) {
    return;
  }

  const elements = detailViewConfig.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) => {
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
              objectMappings: propertyPathReplacer(
                property.listFields.objectMappings
              ),
            },
          };
        }
        return property;
      }),
    })),
  }));

  return { ...detailViewConfig, elements };
};

export const applyReplacementsToEditView = (
  config: DatasetConfig,
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
      properties: subcategory.properties.map((property) => {
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
              objectMappings: propertyPathReplacer(
                property.listFields.objectMappings
              ),
            },
          };
        }
        return property;
      }),
    })),
  }));

  return { ...editViewConfig, elements };
};

export const applyReplacementsToNewView = (
  config: DatasetConfig,
  propertyPathReplacer: PropertyPathReplacer
): NewViewConfig | undefined => {
  console.log('computeEditView');

  const newViewConfig = config.views?.new;
  if (newViewConfig == null) {
    return;
  }

  const elements = newViewConfig.elements.map((element) => ({
    ...element,
    subcategories: element.subcategories.map((subcategory) => ({
      ...subcategory,
      properties: subcategory.properties.map((property) => {
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
              objectMappings: propertyPathReplacer(
                property.listFields.objectMappings
              ),
            },
          };
        }
        return property;
      }),
    })),
  }));

  return { ...newViewConfig, elements };
};

export const applyReplacementsToQuickView = (
  config: DatasetConfig,
  propertyPathReplacer: PropertyPathReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = config.views?.quick;
  if (quickViewConfig == null) {
    return;
  }

  const elements = quickViewConfig.elements.map((element) => {
    if (element.objectMappings != null) {
      return {
        ...element,
        listFields: undefined,
        objectMappings: propertyPathReplacer(element.objectMappings),
      };
    } else if (element.listFields != null) {
      return {
        ...element,
        objectMappings: undefined,
        listFields: {
          ...element.listFields,
          objectMappings: propertyPathReplacer(
            element.listFields.objectMappings
          ),
        },
      };
    }

    return { ...element };
  });

  return { ...quickViewConfig, elements };
};
