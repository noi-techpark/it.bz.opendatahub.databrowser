// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  ROLE_CREATE,
  ROLE_DELETE,
  ROLE_READ,
  ROLE_UPDATE,
} from '../../../config/tourism/roles';
import { isWithTourismPagination } from '../../api';
import { CellComponent } from '../../cellComponents/types';
import {
  defaultMobilityTableQueryParameters,
  defaultTourismTableQueryParameters,
} from '../../datasets/tableView/defaultValues';
import {
  domainWithOpenApiDocument,
  domainIsKnownToHaveOpenApiDocument,
  useOpenApi,
} from '../../openApi';
import { OpenApi, DomainWithOpenApiDocument } from '../../openApi/types';
import {
  DatasetConfig,
  AnyDomain,
  DetailViewConfig,
  ListElements,
  ListViewConfig,
  OperationKey,
  PropertyConfig,
  PathSegments,
} from '../types';
import { findCandidateConfigs } from '../utils';
import {
  DatasetConfigLoader,
  LoadDatasetConfigFn,
  LoadAllDatasetConfigsFn,
} from './types';

type ErrorMessage = string;

type ResourceName = string;

type Resources = Record<ResourceName, DatasetConfig>;

const isErrorMessage = (o: unknown): o is ErrorMessage =>
  o != null && typeof o === 'string';

const loadDatasetConfig: LoadDatasetConfigFn = async (domain, pathSegments) => {
  if (!domainIsKnownToHaveOpenApiDocument(domain)) {
    return Promise.reject(
      `ODH domain ${domain} is unknown, not able to generate dataset config`
    );
  }

  const document = await useOpenApi().loadDocument(domain);

  if (document == null) {
    return Promise.reject(`No OpenAPI document found for ODH domain ${domain}`);
  }

  const configOrErrorMessage = findGeneratedDatasetConfig(
    domain,
    pathSegments,
    document
  );

  return isErrorMessage(configOrErrorMessage)
    ? Promise.reject(configOrErrorMessage)
    : Promise.resolve(configOrErrorMessage);
};

const findGeneratedDatasetConfig = (
  domain: DomainWithOpenApiDocument,
  pathSegments: PathSegments,
  document: OpenApi.Document
): DatasetConfig | ErrorMessage => {
  const parseResult = parse(domain, document);

  if (isErrorMessage(parseResult)) {
    return parseResult;
  }

  const candidates = findCandidateConfigs(pathSegments, parseResult);

  if (candidates.length === 0) {
    return `Not able to find a match for path "${pathSegments}" in OpenAPI document for ODH domain ${domain}`;
  }

  if (candidates.length > 1) {
    console.debug(
      `Found ${candidates.length} matches for path "${pathSegments}" in OpenAPI document for ODH domain ${domain}`
    );
  }

  return candidates[0].config;
};

const parse = (
  domain: DomainWithOpenApiDocument,
  document: OpenApi.Document
): Resources | ErrorMessage => {
  // Use first server URL
  const serverUrl = document.servers?.map((server) => server.url)?.[0];
  if (serverUrl == null) {
    return `No server URL found in OpenAPI description for ODH domain "${domain}"`;
  }

  return Object.entries(document.paths).reduce<Resources>(
    (previous, [path, httpMethods]) => {
      if (httpMethods == null) {
        return previous;
      }

      const { datasetConfig, isResourceInstancePath, resourcePath } =
        getOrBuildBaseDatasetConfig(domain, serverUrl, path, previous);

      Object.entries(httpMethods).forEach((entry) => {
        const httpMethod = entry[0] as OpenApi.HttpMethods;
        const openApiOperation = entry[1] as OpenApi.OperationObject;

        // Begin resolve operation
        const operation = mapHttpMethodToOperations(
          httpMethod,
          isResourceInstancePath
        );

        if (operation == null) {
          console.error(
            `Unknown operation for path ${path} and method ${httpMethod}`
          );
          return;
        }

        if (datasetConfig.operations == null) {
          datasetConfig.operations = {};
        }
        const rolesAllowed = mapOperationToRoles(operation);
        datasetConfig.operations[operation] = { rolesAllowed };

        datasetConfig.description.description =
          httpMethods.summary ?? httpMethods[httpMethod]?.summary;
        // End resolve operation

        // Begin resolve view
        if (datasetConfig.views == null) {
          datasetConfig.views = {};
        }

        const schema = schemaFromEndpointMethod(
          domain,
          operation,
          openApiOperation
        );
        const schemaProperties = extractSchemaProperties(schema);

        if (operation === 'readAll') {
          // Handle tourism pagination style result
          if (isWithTourismPagination(schemaProperties)) {
            datasetConfig.views.table = listViewConfigFromProperties(
              (schemaProperties as any).Items?.items?.properties
            );
          } else {
            datasetConfig.views.table =
              listViewConfigFromProperties(schemaProperties);
          }

          // Set default query parameters
          datasetConfig.views.table.defaultQueryParams =
            domain === 'tourism'
              ? defaultTourismTableQueryParameters
              : defaultMobilityTableQueryParameters;
        } else if (operation === 'read') {
          datasetConfig.views.detail =
            detailViewConfigFromProperties(schemaProperties);
        }
        // End resolve view
      });

      return {
        ...previous,
        [resourcePath]: datasetConfig,
      };
    },
    {}
  );
};

const getOrBuildBaseDatasetConfig = (
  domain: DomainWithOpenApiDocument,
  serverUrl: string,
  path: string,
  knownDatasetConfigs: Resources
): {
  datasetConfig: DatasetConfig;
  isResourceInstancePath: boolean;
  resourcePath: string;
} => {
  const pathSegments = path.split('/').filter((p) => p.trim().length > 0);

  // Check if the last path param is a resource instance ID
  const isResourceInstancePath =
    domain === 'mobility' ? false : pathSegments.at(-1)?.match('{.*}') != null;

  const resourcePathSegments = isResourceInstancePath
    ? pathSegments.slice(0, -1)
    : pathSegments;

  const resourcePath = '/' + resourcePathSegments.join('/');

  if (knownDatasetConfigs[resourcePath] != null) {
    return {
      datasetConfig: knownDatasetConfigs[resourcePath],
      isResourceInstancePath,
      resourcePath,
    };
  }

  return {
    datasetConfig: {
      baseUrl: serverUrl,
      source: 'generated',
      route: {
        domain,
        pathSegments: resourcePathSegments,
      },
      description: {
        title:
          resourcePathSegments.length > 0
            ? resourcePathSegments.slice(1).join('/')
            : '',
      },
    },
    isResourceInstancePath,
    resourcePath,
  };
};

const mapHttpMethodToOperations = (
  httpMethod: OpenApi.HttpMethods,
  isInstance: boolean
): OperationKey | undefined => {
  switch (httpMethod) {
    case 'get':
      return isInstance ? 'read' : 'readAll';
    case 'delete':
      return 'delete';
    case 'post':
      return 'create';
    case 'put':
      return 'update';
  }
};

const mapOperationToRoles = (operation: OperationKey): string[] => {
  switch (operation) {
    case 'read':
    case 'readAll':
      return ROLE_READ;
    case 'create':
      return ROLE_CREATE;
    case 'update':
      return ROLE_UPDATE;
    case 'delete':
      return ROLE_DELETE;
  }
};

const isArraySchema = (schema: any): schema is OpenApi.ArraySchemaObject =>
  schema?.items != null;

const schemaFromEndpointMethod = (
  domain: DomainWithOpenApiDocument,
  operation: OperationKey,
  endpointMethod: OpenApi.OperationObject
): OpenApi.SchemaObject | undefined => {
  if (operation === 'read' || operation === 'readAll') {
    const responseOk = endpointMethod.responses?.[200] as
      | OpenApi.ResponseObject
      | undefined;
    const schema = responseOk?.content?.['application/json']?.schema as
      | OpenApi.SchemaObject
      | undefined;

    return domain !== 'mobility' ? schema : mobilityDefaultSchema;
  }
  if (operation === 'create' || operation === 'update') {
    const requestBody = endpointMethod.requestBody as
      | OpenApi.RequestBodyObject
      | undefined;
    return requestBody?.content['application/json']?.schema as
      | OpenApi.SchemaObject
      | undefined;
  }
};

const extractSchemaProperties = (
  schema?: OpenApi.SchemaObject
): OpenApi.SchemaObject | undefined => {
  if (schema == null) {
    return;
  }
  if (schema.properties != null) {
    return schema.properties;
  }
  if (isArraySchema(schema)) {
    return (schema.items as OpenApi.SchemaObject).properties;
  }
};

const listViewConfigFromProperties = (
  properties: OpenApi.SchemaObject | undefined
): ListViewConfig => {
  const elements: ListElements[] = Object.keys(properties ?? [])
    .map((name) => {
      return {
        title: name,
        component: CellComponent.TypeBasedCell,
        propertyMappings: {
          data: name,
        },
        class: 'w-60 leading-3',
      };
    })
    .sort(sortByMainOrderAndLocalCompare);

  return { elements };
};

const detailViewConfigFromProperties = (
  properties: OpenApi.SchemaObject | undefined
): DetailViewConfig => {
  const subcategoryProperties: PropertyConfig[] = Object.keys(properties ?? [])
    .map((name) => {
      return {
        title: name,
        component: CellComponent.TypeBasedCell,
        propertyMappings: {
          data: name,
        },
      };
    })
    .sort(sortByMainOrderAndLocalCompare);

  return {
    elements: [
      {
        name: 'All data',
        slug: 'all',
        subcategories: [
          {
            name: '',
            properties: subcategoryProperties,
          },
        ],
      },
    ],
  };
};

const sortByMainOrderAndLocalCompare = (
  a: PropertyConfig,
  b: PropertyConfig
) => {
  const mainOrder = ['ID', 'NAME', 'TITLE', 'ACTIVE'];

  const aIndex = mainOrder.indexOf(a.title.toUpperCase());
  const bIndex = mainOrder.indexOf(b.title.toUpperCase());

  if (aIndex < 0 && bIndex < 0) {
    return a.title.localeCompare(b.title);
  } else if (aIndex < 0) {
    return 1;
  } else if (bIndex < 0) {
    return -1;
  }

  return aIndex - bIndex;
};

const loadAllDatasetConfigs: LoadAllDatasetConfigsFn = async () => {
  const result: Record<AnyDomain, DatasetConfig[]> = {};

  for (const domain of Object.keys(domainWithOpenApiDocument)) {
    const document = await useOpenApi().loadDocument(domain as any);

    // If no OpenAPI document could be found, then there are no view configs to return
    if (document == null) {
      continue;
    }

    // Use first server URL
    const serverUrl = document.servers?.map((server) => server.url)?.[0];

    if (serverUrl == null) {
      return Promise.reject(
        `No server URL found in OpenAPI description for ODH domain "${domain}"`
      );
    }

    const resources = parse(domain as DomainWithOpenApiDocument, document);

    result[domain] = Object.values(resources);
  }

  return result;
};

// This is a default schema for mobility, which is used because the mobility
// OpenAPI document does not contain any correct schemas. Hopefully, this will
// be fixed in the future.
const mobilityDefaultSchema: OpenApi.SchemaObject = {
  type: 'object',
  properties: {
    sname: {
      type: 'string',
    },
    stype: {
      type: 'string',
    },
    scode: {
      type: 'string',
    },
    sorigin: {
      type: 'string',
    },
    sactive: {
      type: 'boolean',
    },
    scoordinate: {
      type: 'object',
    },
    smetadata: {
      type: 'object',
    },
    sparent: {
      type: 'object',
    },
  },
};

export const providerForGeneratedDatasetConfig: DatasetConfigLoader = {
  source: 'generated',
  loadDatasetConfig,
  loadAllDatasetConfigs,
};
