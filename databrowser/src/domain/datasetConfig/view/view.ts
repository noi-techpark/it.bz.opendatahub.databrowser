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
  PropertyMappings,
  QuickViewConfig,
  ToMaybeRefs,
  ViewConfig,
  ViewKey,
} from '../types';
import { computed, toValue } from 'vue';
import { PropertyMappingsReplacer } from '../replace/propertyMappingReplacer';

interface ComputeDatasetReplacementParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  propertyMappingsReplacer: PropertyMappingsReplacer;
}

export const computeView = ({
  datasetConfig,
  viewKey,
  propertyMappingsReplacer,
}: ComputeDatasetReplacementParams): ViewConfig | undefined => {
  if (viewKey == null || datasetConfig == null) {
    return undefined;
  }

  return applyReplacementsToView(
    viewKey,
    datasetConfig,
    propertyMappingsReplacer
  );
};

export const useComputeView = (
  params: ToMaybeRefs<ComputeDatasetReplacementParams>
) =>
  computed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const propertyMappingReplacer = toValue(params.propertyMappingsReplacer);

    return computeView({
      datasetConfig,
      viewKey,
      propertyMappingsReplacer: propertyMappingReplacer,
    });
  });

export const applyReplacementsToView = (
  viewKey: ViewKey,
  config: DatasetConfig,
  propertyMappingsReplacer: PropertyMappingsReplacer
): ViewConfig | undefined => {
  switch (viewKey) {
    case 'table':
      return applyReplacementsToTableView(config, propertyMappingsReplacer);
    case 'detail':
      return applyReplacementsToDetailView(config, propertyMappingsReplacer);
    case 'edit':
      return applyReplacementsToEditView(config, propertyMappingsReplacer);
    case 'new':
      return applyReplacementsToNewView(config, propertyMappingsReplacer);
    case 'quick':
      return applyReplacementsToQuickView(config, propertyMappingsReplacer);
    case 'raw':
      return config.views?.raw;
  }
};

export const applyReplacementsToTableView = (
  config: DatasetConfig,
  propertyMappingsReplacer: PropertyMappingsReplacer
): ListViewConfig | undefined => {
  console.log('computeTableView');

  const tableViewConfig = config.views?.table;
  if (tableViewConfig == null) {
    return undefined;
  }

  const firstPropertyName = (propertyMappings?: PropertyMappings) => {
    const values = Object.values(propertyMappings ?? {});
    return values.length === 1 ? values[0] : undefined;
  };

  const result = {
    ...tableViewConfig,
    elements: tableViewConfig.elements.map<ListElements>((element) => {
      const propertyMappings = propertyMappingsReplacer(
        element.propertyMappings
      );
      const propertyName = firstPropertyName(propertyMappings);
      return {
        ...element,
        propertyMappings: propertyMappings,
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
  propertyMappingsReplacer: PropertyMappingsReplacer
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
        if (property.propertyMappings != null) {
          return {
            ...property,
            listFields: undefined,
            propertyMappings: propertyMappingsReplacer(
              property.propertyMappings
            ),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            propertyMappings: undefined,
            listFields: {
              ...property.listFields,
              propertyMappings: propertyMappingsReplacer(
                property.listFields.propertyMappings
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
  propertyMappingsReplacer: PropertyMappingsReplacer
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
        if (property.propertyMappings != null) {
          return {
            ...property,
            listFields: undefined,
            propertyMappings: propertyMappingsReplacer(
              property.propertyMappings
            ),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            propertyMappings: undefined,
            listFields: {
              ...property.listFields,
              propertyMappings: propertyMappingsReplacer(
                property.listFields.propertyMappings
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
  propertyMappingsReplacer: PropertyMappingsReplacer
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
        if (property.propertyMappings != null) {
          return {
            ...property,
            listFields: undefined,
            propertyMappings: propertyMappingsReplacer(
              property.propertyMappings
            ),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            propertyMappings: undefined,
            listFields: {
              ...property.listFields,
              propertyMappings: propertyMappingsReplacer(
                property.listFields.propertyMappings
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
  propertyMappingsReplacer: PropertyMappingsReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = config.views?.quick;
  if (quickViewConfig == null) {
    return;
  }

  const elements = quickViewConfig.elements.map((element) => {
    if (element.propertyMappings != null) {
      return {
        ...element,
        listFields: undefined,
        propertyMappings: propertyMappingsReplacer(element.propertyMappings),
      };
    } else if (element.listFields != null) {
      return {
        ...element,
        propertyMappings: undefined,
        listFields: {
          ...element.listFields,
          propertyMappings: propertyMappingsReplacer(
            element.listFields.propertyMappings
          ),
        },
      };
    }

    return { ...element };
  });

  return { ...quickViewConfig, elements };
};
