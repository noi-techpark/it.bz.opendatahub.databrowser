// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FieldsReplacer } from './fieldReplacer';
import {
  DatasetConfig,
  ListViewConfig,
  ListElements,
  DetailViewConfig,
  EditViewConfig,
  NewViewConfig,
  QuickViewConfig,
  ViewKey,
  RawViewConfig,
  ViewConfig,
} from './types';

export const applyReplacementsToView = (
  viewKey: ViewKey,
  config: DatasetConfig,
  replaceFields: FieldsReplacer
): ViewConfig | undefined => {
  switch (viewKey) {
    case 'table':
      return applyReplacementsToTableView(config, replaceFields);
    case 'detail':
      return applyReplacementsToDetailView(config, replaceFields);
    case 'edit':
      return applyReplacementsToEditView(config, replaceFields);
    case 'new':
      return applyReplacementsToNewView(config, replaceFields);
    case 'quick':
      return applyReplacementsToQuickView(config, replaceFields);
    case 'raw':
      return config.views?.raw;
  }
};

export const applyReplacementsToTableView = (
  config: DatasetConfig,
  replaceFields: FieldsReplacer
): ListViewConfig | undefined => {
  console.log('computeTableView');

  const tableViewConfig = config.views?.table;
  if (tableViewConfig == null) {
    return undefined;
  }

  const firstField = (fields?: Record<string, string>) => {
    const values = Object.values(fields ?? {});
    return values.length === 1 ? values[0] : undefined;
  };

  const result = {
    ...tableViewConfig,
    elements: tableViewConfig.elements.map<ListElements>((element) => {
      const fields = replaceFields(element.fields);
      const field = firstField(fields);
      return { ...element, fields, field, listFields: undefined };
    }),
  };

  console.timeEnd('datasetConfig table view config');
  console.groupEnd();

  return result;
};

export const applyReplacementsToDetailView = (
  config: DatasetConfig,
  replaceFields: FieldsReplacer
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
        if (property.fields != null) {
          return {
            ...property,
            listFields: undefined,
            fields: replaceFields(property.fields),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            fields: undefined,
            listFields: {
              ...property.listFields,
              fields: replaceFields(property.listFields.fields),
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
  replaceFields: FieldsReplacer
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
        if (property.fields != null) {
          return {
            ...property,
            listFields: undefined,
            fields: replaceFields(property.fields),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            fields: undefined,
            listFields: {
              ...property.listFields,
              fields: replaceFields(property.listFields.fields),
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
  replaceFields: FieldsReplacer
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
        if (property.fields != null) {
          return {
            ...property,
            listFields: undefined,
            fields: replaceFields(property.fields),
          };
        } else if (property.listFields != null) {
          return {
            ...property,
            fields: undefined,
            listFields: {
              ...property.listFields,
              fields: replaceFields(property.listFields.fields),
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
  replaceFields: FieldsReplacer
): QuickViewConfig | undefined => {
  console.log('computeQuickView');

  const quickViewConfig = config.views?.quick;
  if (quickViewConfig == null) {
    return;
  }

  const elements = quickViewConfig.elements.map((element) => {
    if (element.fields != null) {
      return {
        ...element,
        listFields: undefined,
        fields: replaceFields(element.fields),
      };
    } else if (element.listFields != null) {
      return {
        ...element,
        fields: undefined,
        listFields: {
          ...element.listFields,
          fields: replaceFields(element.listFields.fields),
        },
      };
    }

    return { ...element };
  });

  return { ...quickViewConfig, elements };
};
