// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { OpenAPIV3 } from 'openapi-types';
import { DomainWithOpenApiDocument } from '../../../../openApi';
import { ViewKey } from '../../../config/types';

type MaybeSchemaObject = OpenAPIV3.SchemaObject | undefined;
type MaybeArraySchemaObject = OpenAPIV3.ArraySchemaObject | undefined;

/**
 * Returns the OpenAPI schema for the given domain, path and view.
 *
 * @param doc The OpenAPI document.
 * @param domain The domain.
 * @param pathSegments The path segments.
 * @param viewKey The view key.
 * @returns The OpenAPI schema or undefined if no schema is found.
 */
export const getSchema = (
  doc: OpenAPIV3.Document,
  domain: DomainWithOpenApiDocument,
  pathSegments: string[],
  viewKey: ViewKey
): MaybeSchemaObject => {
  const path = getPath(doc, pathSegments, viewKey);

  // If no path is found, return undefined because we are not able to determine the schema
  if (path == null) {
    return undefined;
  }

  // Check if the path for a 200 (ok) response exists in the OpenAPI document
  const responseOk = doc?.paths?.[path]?.get?.responses?.['200'] as
    | OpenAPIV3.ResponseObject
    | undefined;

  // Get the schema for the 'application/json' media type which should cover most of the cases
  const schemaBase = responseOk?.content?.['application/json']
    ?.schema as MaybeSchemaObject;

  // Tourism domain needs special treatment
  if (domain === 'tourism' && viewKey === 'table') {
    const dataContainer = schemaBase?.properties
      ?.Items as MaybeArraySchemaObject;
    return dataContainer?.items as MaybeSchemaObject;
  }

  return schemaBase;
};

/**
 * Returns the path for the given path segments and view.
 *
 * If the view is a table, the path is returned as is. If the
 * view is not a table, the path for a single record is returned.
 *
 * @param doc The OpenAPI document.
 * @param pathSegments The path segments.
 * @param viewKey The view key.
 * @returns The path or undefined if no path is found.
 */
const getPath = (
  doc: OpenAPIV3.Document,
  pathSegments: string[],
  viewKey: ViewKey
): string | undefined => {
  const path = `/${pathSegments.join('/')}`;

  // If the view is a table, we can use the path as is
  if (viewKey == 'table') {
    return path;
  }

  // If the view is not a table, we need to check if the path for a single
  // record exists in the OpenAPI document
  return Object.keys(doc?.paths ?? {}).find(
    (key) => key.match(path + '/{.*}') != null
  );
};

/**
 * Returns all the OpenAPI schemas starting from the given root schema
 * and following the given path segments.
 *
 * @param rootSchema The root schema.
 * @param pathSegments The path segments.
 * @returns An array of objects containing the name, path from root and schema.
 */
export const getSchemasForPath = (
  rootSchema: OpenAPIV3.SchemaObject,
  pathSegments: string[]
): {
  name: string;
  pathFromRoot: string;
  schema: OpenAPIV3.SchemaObject;
}[] => {
  // Initialize result as empty array. On each iteration, we add the current
  // schema to the result.
  const result: ReturnType<typeof getSchemasForPath> = [];

  // Initialize path from root as empty array. On each iteration, we add the
  // current name to the path from root.
  const pathFromRoot: string[] = [];

  // Initialize current schema as root schema. On each iteration, we set the
  // current schema to the child schema of the current schema.
  let currentSchema: MaybeSchemaObject = rootSchema;

  // Iterate over path segments and add the current schema to the result
  for (const name of pathSegments) {
    // Get child schema for current schema and name
    const childSchema = getChildSchema(currentSchema, name);

    // Return result if there is no child schema
    if (childSchema == null) {
      return result;
    }

    // Update path from root and current schema
    pathFromRoot.push(name);
    currentSchema = childSchema;

    // Add current schema to result array
    result.push({
      name,
      pathFromRoot: pathFromRoot.join('.'),
      schema: currentSchema,
    });
  }

  return result;
};

const getChildSchema = (
  schema: OpenAPIV3.SchemaObject,
  name: string
): MaybeSchemaObject => {
  if (schema.type === 'array') {
    return schema.items as MaybeSchemaObject;
  }
  if (schema.type === 'object') {
    // Check if there is a property with the given name
    const nextSchema = schema.properties?.[name];

    // If there is a property with the given name, return it
    if (nextSchema != null) {
      return nextSchema as MaybeSchemaObject;
    }

    // If there is no property with the given name, check if there is an
    // additionalProperties property. This is used for dictionary/map types
    // in OpenAPI spec, e.g. in the tourism domain this happens for properties
    // with translations, e.g. path 'Details.{language}.Title'.
    // The additionalProperties may also be a boolean, in which case it is used
    // to indicate whether additional properties are allowed or not. Since this
    // is not relevant for our use case, we ignore it and just check if
    // additionalProperties is an object.
    if (
      schema.additionalProperties != null &&
      typeof schema.additionalProperties === 'object'
    ) {
      return schema.additionalProperties as MaybeSchemaObject;
    }
  }

  return undefined;
};
