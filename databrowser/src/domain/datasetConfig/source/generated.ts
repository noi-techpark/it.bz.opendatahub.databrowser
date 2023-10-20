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
  DatasetDomain,
  DetailViewConfig,
  ListElements,
  ListViewConfig,
  OperationKey,
  PropertyConfig,
  ViewKey,
} from '../types';
import { DatasetConfigSource, SourceResolver } from './types';

type ErrorMessage = string;

type ResourceName = string;

type Resources = Record<ResourceName, DatasetConfig>;

const isErrorMessage = (o: unknown): o is ErrorMessage =>
  o != null && typeof o === 'string';

const sourceResolver: SourceResolver = async (datasetRoute) => {
  const { domain, pathParams } = datasetRoute;

  if (!domainIsKnownToHaveOpenApiDocument(domain)) {
    return Promise.reject(
      `ODH domain ${domain} is unknown, not able to generate configuration`
    );
  }

  const document = await useOpenApi().loadDocument(domain);

  if (document == null) {
    return Promise.reject(`No OpenAPI document found for ODH domain ${domain}`);
  }

  const configOrErrorMessage = toGeneratedConfiguration(
    domain,
    pathParams,
    document
  );

  return isErrorMessage(configOrErrorMessage)
    ? Promise.reject(configOrErrorMessage)
    : Promise.resolve(configOrErrorMessage);
};

const toGeneratedConfiguration = (
  domain: DomainWithOpenApiDocument,
  pathParams: string[],
  document: OpenApi.Document
): DatasetConfig | ErrorMessage => {
  const parseResult = parse(domain, document);

  if (isErrorMessage(parseResult)) {
    return parseResult;
  }

  const path = '/' + pathParams.join('/');
  const resource = parseResult[path];

  if (resource == null) {
    return `Not able to find a match for path params "${pathParams}" in OpenAPI document for ODH domain ${domain}`;
  }

  return resource;
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

        datasetConfig.description.description = httpMethods.summary;
        // End resolve operation

        // Begin resolve view
        if (datasetConfig.views == null) {
          datasetConfig.views = {};
        }

        const viewKey = mapOperationToViewKey(operation);
        const schema = schemaFromEndpointMethod(operation, openApiOperation);
        const schemaProperties = extractSchemaProperties(schema);

        if (viewKey === 'table') {
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
        } else if (viewKey === 'detail') {
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
  const pathParams = path.split('/').filter((p) => p.trim().length > 0);

  const isResourceInstancePath = pathParams.at(-1)?.match('{.*}') != null;

  const resourcePathParams = isResourceInstancePath
    ? pathParams.slice(0, -1)
    : pathParams;

  const resourcePath = '/' + resourcePathParams.join('/');

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
        pathParams: resourcePathParams,
      },
      description: {
        title:
          resourcePathParams.length > 0
            ? resourcePathParams.slice(1).join('/')
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

const mapOperationToViewKey = (
  operation: OperationKey
): ViewKey | undefined => {
  switch (operation) {
    case 'read':
      return 'detail';
    case 'readAll':
      return 'table';
    case 'update':
      return 'edit';
  }
};

const isArraySchema = (schema: any): schema is OpenApi.ArraySchemaObject =>
  schema?.items != null;

const schemaFromEndpointMethod = (
  operation: OperationKey,
  endpointMethod: OpenApi.OperationObject
) => {
  if (operation === 'read' || operation === 'readAll') {
    const responseOk = endpointMethod.responses?.[200] as
      | OpenApi.ResponseObject
      | undefined;
    return responseOk?.content?.['application/json']?.schema as
      | OpenApi.SchemaObject
      | undefined;
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

const extractSchemaProperties = (schema?: OpenApi.SchemaObject) => {
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
        fields: {
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
        fields: {
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

const getAllDatasetConfigs = async (): Promise<
  Record<DatasetDomain, DatasetConfig[]>
> => {
  const result: Record<DatasetDomain, DatasetConfig[]> = {};

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

export const generatedDatasetConfigSource: DatasetConfigSource = {
  source: 'generated',
  resolve: sourceResolver,
  getAllDatasetConfigs,
};
