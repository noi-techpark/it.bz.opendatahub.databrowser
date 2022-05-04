import {
  DetailRenderConfig,
  ListElements,
  ListRenderConfig,
  NoViewConfig,
  PathParams,
  PropertyConfig,
  ViewConfig,
} from '../types';
import { CellComponent } from '../../cellComponents/types';
import { isWithTourismPagination } from '../../api/client/types';
import { OpenApi } from '../../openApi/types';
import { isDomainKnown, useOpenApi } from '../../openApi';
import { SourceResolver, ViewConfigSource } from './types';

const sourceResolver: SourceResolver = async (
  domainAndPathParams: PathParams
) => {
  // Expect first entry in array to be the ODH domain
  const [odhDomain, ...pathParams] = domainAndPathParams.filter(
    (dataset) => dataset != null
  );

  if (!isDomainKnown(odhDomain)) {
    return Promise.resolve({
      reason: `ODH domain ${odhDomain} is unknown, not able to generate configuration`,
    });
  }

  const document = await useOpenApi().loadDocument(odhDomain);

  if (document == null) {
    return Promise.resolve({
      reason: `No viable endpoint found for ODH domain ${odhDomain}`,
    });
  }

  return toGeneratedConfiguration(odhDomain, pathParams, document);
};

const toGeneratedConfiguration = (
  odhDomain: string,
  pathParams: PathParams,
  document: OpenApi.Document
): ViewConfig | NoViewConfig => {
  if (document == null) {
    return {
      reason: `No document found in OpenAPI description for ODH domain "${odhDomain}"`,
    };
  }

  // Use first server URL
  const serverUrl = document.servers?.map((server) => server.url)?.[0];

  if (serverUrl == null) {
    return {
      reason: `No server URL found in OpenAPI description for ODH domain "${odhDomain}"`,
    };
  }

  const endpoint = findMatchingEndpointPath(document, pathParams);

  if (endpoint == null) {
    return {
      reason: `No endpoint found in OpenAPI description for ODH domain "${odhDomain}" and path params "${pathParams}"`,
    };
  }

  const getMethod = endpoint.get;

  if (getMethod == null) {
    return {
      reason: `No GET method found in OpenAPI description for ODH domain "${odhDomain}" and path params "${pathParams}"`,
    };
  }

  const path = toPath(pathParams);
  const renderConfig = toRenderConfig(getMethod);

  if (renderConfig != null) {
    // Wrap render config in ViewConfig and return it
    return {
      source: 'generated',
      description: {
        title: getMethod.summary,
      },
      baseUrl: serverUrl,
      path,
      renderConfig,
    };
  }

  return {
    reason: `Not able to find a match for path params "${pathParams}" in OpenAPI document for ODH domain ${odhDomain}`,
  };
};

const findMatchingEndpointPath = (
  document: OpenApi.Document,
  pathParams: PathParams
): OpenApi.PathItemObject | null => {
  // Try to find direct match
  const path = toPath(pathParams);
  const endpoint = document.paths[path];
  if (endpoint != null) {
    return endpoint;
  }

  // Try to find match on paths, where dynamic path params) are skipped.
  // Dynamic path params are surrounded by {}, e.g. {id}
  const pathMatch = Object.keys(document.paths).find((openApiPath) => {
    console.log('Trying OpenAPI endpoint path', openApiPath);
    // Remove leading slash '/' from endpoint path and then split
    const openApiPathEntries = openApiPath.substring(1).split('/');

    // If number of elements in path arrays are different, they can not match.
    // Skip those entries
    if (pathParams.length !== openApiPathEntries.length) {
      return false;
    }

    // Search a path param that doesn't match the corresponding OpenAPI path param.
    // If such a non-match is found, the whole paths don't match
    // A path entry matches if it either matches or if it is a dynamic
    // param
    const hasNonMatchingPath = pathParams.find((element, index) => {
      return (
        element !== openApiPathEntries[index] &&
        openApiPathEntries[index].match('^\\{.*\\}$') == null
      );
    });

    if (hasNonMatchingPath) {
      return false;
    }

    return true;
  });

  if (pathMatch != null) {
    return document.paths[pathMatch]!;
  }

  return null;
};

const toRenderConfig = (
  getMethod: OpenApi.OperationObject
): ListRenderConfig | DetailRenderConfig | null => {
  const schema = schemaFromEndpointMethod(getMethod);

  if (schema == null) {
    return null;
  }

  const schemaType = schema.type;

  if (schemaType === 'array') {
    const schemaProperties = (schema.items as OpenApi.SchemaObject).properties;
    return listViewConfigFromProperties(schemaProperties);
  }

  if (schemaType === 'object') {
    const schemaProperties = schema?.properties;

    // Handle tourism pagination style result
    if (isWithTourismPagination(schemaProperties)) {
      return listViewConfigFromProperties(
        (schemaProperties as any).Items?.items?.properties
      );
    }

    // Handle single property
    return detailViewConfigFromProperties(schemaProperties);
  }

  return null;
};

const schemaFromEndpointMethod = (endpointMethod?: OpenApi.OperationObject) => {
  const responseOk = endpointMethod?.responses?.[200] as
    | OpenApi.ResponseObject
    | undefined;
  const responseContent = responseOk?.content;
  const responseDescriptionByMediaType = responseContent?.['application/json'];
  return responseDescriptionByMediaType?.schema as
    | OpenApi.SchemaObject
    | undefined;
};

const listViewConfigFromProperties = (
  properties: OpenApi.SchemaObject | undefined
): ListRenderConfig => {
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

  return {
    type: 'list',
    elements,
  };
};

const detailViewConfigFromProperties = (
  properties: OpenApi.SchemaObject | undefined
): DetailRenderConfig => {
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
    type: 'detail',
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

const toPath = (pathParams: PathParams) => `/${pathParams.join('/')}`;

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

export const generatedViewConfigSource: ViewConfigSource = {
  source: 'generated',
  resolver: sourceResolver,
};
