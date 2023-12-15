// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { OpenAPIV3 } from 'openapi-types';
import { DomainWithOpenApiDocument } from '../../../../openApi';
import {
  ArrayMapping,
  DatasetPath,
  Deprecation,
  DeprecationInfo,
  ObjectMapping,
  PropertyConfig,
  SubCategoryElement,
} from '../../../config/types';
import {
  ListViewConfigWithType,
  QuickViewConfigWithType,
  SingleRecordViewConfigWithType,
  ViewConfigWithType,
} from '../../types';
import { getSchema, getSchemasForPath } from './openApiUtils';

export const computeViewWithOpenApiEnhancements = (
  doc: OpenAPIV3.Document,
  domain: DomainWithOpenApiDocument,
  datasetPath: DatasetPath,
  view: ViewConfigWithType
): ViewConfigWithType => {
  const schema = getSchema(doc, domain, datasetPath, view.type);

  if (schema == null) {
    console.log(
      `No schema found in OpenAPI spec for domain ${domain}, path ${datasetPath} and view ${view.type}.`
    );
    return view;
  }

  switch (view.type) {
    case 'table':
      return computeTableView(schema, view);
    case 'quick':
      return computeQuickView(schema, view);
    case 'raw':
      return view;
    default:
      return computeSingleRecordView(schema, view);
  }
};

const computeTableView = (
  schema: OpenAPIV3.SchemaObject,
  view: ListViewConfigWithType
) => {
  return view.elements.reduce<ListViewConfigWithType>(
    (prev, element) => {
      return {
        ...prev,
        elements: [
          ...prev.elements,
          {
            ...element,
            // Add deprecation and required information to the element
            ...getDeprecationAndRequired(schema, element),
          },
        ],
      };
    },
    { elements: [], type: 'table' }
  );
};

const computeSingleRecordView = (
  schema: OpenAPIV3.SchemaObject,
  view: SingleRecordViewConfigWithType
): ViewConfigWithType => {
  return view.elements.reduce<SingleRecordViewConfigWithType>(
    (prev, element) => {
      const subcategories = element.subcategories?.map<SubCategoryElement>(
        (subcategory) => {
          const properties = subcategory.properties.map<PropertyConfig>(
            (property) => {
              return {
                ...property,
                // Add deprecation and required information to the property
                ...getDeprecationAndRequired(schema, property),
              };
            }
          );

          return {
            ...subcategory,
            properties,
          };
        }
      );

      return {
        ...prev,
        elements: [
          ...prev.elements,
          {
            ...element,
            subcategories,
          },
        ],
      };
    },
    { elements: [], type: view.type }
  );
};

const computeQuickView = (
  schema: OpenAPIV3.SchemaObject,
  view: QuickViewConfigWithType
): QuickViewConfigWithType => {
  return view.elements.reduce<QuickViewConfigWithType>(
    (prev, element) => ({
      ...prev,
      ...getDeprecationAndRequired(schema, element),
    }),
    { elements: [], type: view.type }
  );
};

const getDeprecationAndRequired = (
  rootSchema: OpenAPIV3.SchemaObject,
  mapping: {
    objectMapping?: ObjectMapping;
    arrayMapping?: ArrayMapping;
  }
) => {
  const { objectMapping, arrayMapping } = mapping;
  // Check which kind of mapping is used
  const efectiveMapping = objectMapping ?? arrayMapping?.objectMapping ?? {};

  // Check if the mapping is an object mapping or an array mapping
  // If it is an array mapping, the path must be constructed as follows:
  // 'Images.0.Url' -> 'Images.[].Url', where 'Images' is the path to the
  // parent and 'Url' is the property name
  const pathToParent =
    objectMapping != null ? '' : `${arrayMapping?.pathToParent}.[].` ?? '';

  return Object.values(efectiveMapping ?? {}).reduce<{
    deprecationInfo: DeprecationInfo[];
    required: boolean;
  }>(
    (prev, value) => {
      const fullPath = pathToParent + value;
      // Get the property path as array, e.g. from 'Images.0.Url' to ['Images', '0', 'Url']
      const propertyPathAsArray = fullPath.split('.');

      // Get the all schemas for the property path
      const schemasForPath = getSchemasForPath(rootSchema, propertyPathAsArray);

      // Get all deprecations from the schemas. Note that there may be multiple
      // deprecations for a single property because elements on the path to the
      // property may be deprecated which also deprecates the property itself.
      // For example, if 'Images' is deprecated, then 'Images.0.Url' is also
      // deprecated.
      const deprecations = schemasForPath
        .filter(({ schema }) => schema.deprecated === true)
        .map<Deprecation>(({ schema, pathFromRoot }) => ({
          description: schema.description ?? '',
          pathToDeprecation: pathFromRoot,
        }));

      // If the property is deprecated, add it to the deprecation info
      // This allows us to show detailed deprecation warnings in the UI
      const deprecationInfo: DeprecationInfo[] =
        deprecations.length === 0
          ? prev.deprecationInfo
          : [
              ...prev.deprecationInfo,
              {
                propertyPath: fullPath,
                deprecations,
              },
            ];

      // Compute required information
      const anyPropertyRequired =
        schemasForPath.filter((subSchema) => subSchema.schema.required).length >
        0;

      const required = prev.required || anyPropertyRequired;

      return { deprecationInfo, required };
    },
    { deprecationInfo: [], required: false }
  );
};
