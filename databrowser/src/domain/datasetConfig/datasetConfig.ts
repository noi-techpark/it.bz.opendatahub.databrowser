// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  View,
  ViewKey,
  DatasetRoute,
  DatasetDomains,
  ListElements,
  DatasetConfig,
  DetailViewConfig,
  EditViewConfig,
  NewViewConfig,
  ListViewConfig,
} from './types';
import { resolveDatasetConfig } from './resolver';
import {
  LocationQuery,
  RouteLocationNormalizedLoaded,
  useRouter,
} from 'vue-router';
import { stringifyParameter } from '../api';
import { domainIsKnownToHaveOpenApiDocument } from '../openApi';
import { DatasetPage } from '../../routes';
import { ref, watch } from 'vue';
import { useDatasetSourceStore } from './useDatasetSourceStore';
import { storeToRefs } from 'pinia';
import { SourceType } from './source/types';
import { FieldsReplacer, buildFieldReplacer } from './fieldReplacer';

export type ResolvedDatasetConfig = Awaited<
  ReturnType<typeof computeDatasetConfig>
>;

export const computeDatasetConfigForCurrentRoute = () => {
  const isResolving = ref(false);
  const resolvedDatasetConfig = ref<ResolvedDatasetConfig>();
  const tableView = ref<ReturnType<typeof computeTableView>>();
  const detailView = ref<ReturnType<typeof computeDetailView>>();
  const editView = ref<ReturnType<typeof computeEditView>>();
  const newView = ref<ReturnType<typeof computeNewView>>();

  const defaultQueryParams = ref<Record<string, string>>({});

  const router = useRouter();
  const datasetSourceStore = useDatasetSourceStore();
  const { source } = storeToRefs(datasetSourceStore);
  watch(
    [router.currentRoute, source],
    async ([route, source]) => {
      isResolving.value = true;

      resolvedDatasetConfig.value = await computeDatasetConfig(route, source);
      datasetSourceStore.source = resolvedDatasetConfig.value.source;

      // Compute default query params and replacements
      defaultQueryParams.value = resolvedDatasetConfig.value.isTableView
        ? resolvedDatasetConfig.value.config.views?.table?.defaultQueryParams ??
          {}
        : resolvedDatasetConfig.value.isDetailView
        ? resolvedDatasetConfig.value.config.views?.detail
            ?.defaultQueryParams ?? {}
        : resolvedDatasetConfig.value.isEditView
        ? resolvedDatasetConfig.value.config.views?.edit?.defaultQueryParams ??
          {}
        : resolvedDatasetConfig.value.isNewView
        ? resolvedDatasetConfig.value.config.views?.new?.defaultQueryParams ??
          {}
        : {};

      const replacements = Object.entries(defaultQueryParams.value).reduce<
        Record<string, string>
      >((prev, [key, defaultValue]) => {
        if (route.query[key] == null) {
          return {
            ...prev,
            [key]: defaultValue,
          };
        }
        return {
          ...prev,
          [key]: stringifyParameter(route.query[key]),
        };
      }, {});

      // Compute views
      const { replaceFields } = buildFieldReplacer(replacements);
      if (resolvedDatasetConfig.value.isTableView) {
        tableView.value = computeTableView(
          resolvedDatasetConfig.value.config,
          replaceFields
        );
      } else if (resolvedDatasetConfig.value.isDetailView) {
        detailView.value = computeDetailView(
          resolvedDatasetConfig.value.config,
          replaceFields
        );
      } else if (resolvedDatasetConfig.value.isEditView) {
        editView.value = computeEditView(
          resolvedDatasetConfig.value.config,
          replaceFields
        );
      } else if (resolvedDatasetConfig.value.isNewView) {
        newView.value = computeNewView(
          resolvedDatasetConfig.value.config,
          replaceFields
        );
      }

      // Remove default query params from url
      const sanitizedQuery = Object.entries(route.query)
        .filter(
          ([key, value]) =>
            !(
              key in defaultQueryParams.value &&
              value === defaultQueryParams.value[key]
            )
        )
        .reduce<LocationQuery>(
          (prev, [key, value]) => ({ ...prev, [key]: value }),
          {}
        );

      await router.replace({
        ...route,
        query: sanitizedQuery,
      });
      // End of remove default query params from url

      isResolving.value = false;
    },
    { immediate: true }
  );

  return {
    isResolving,
    config: resolvedDatasetConfig,
    defaultQueryParams,
    tableView,
    detailView,
    editView,
    newView,
  };
};

export const computeDatasetConfig = async (
  route: RouteLocationNormalizedLoaded,
  source: SourceType
  // replacements: Record<string, string> = {}
) => {
  console.group('computeDatasetConfig');
  console.time('computeDatasetConfig');
  const domain = computeCurrentDomain(route.params.domain);

  const datasetRoute = toDatasetRoute(domain, route);
  console.log('resolve Dataset config');
  console.time('resolve Dataset config');
  console.log('resolve Dataset config start');
  const config = await resolveDatasetConfig(datasetRoute, source);
  console.log('resolve Dataset config done');
  console.timeEnd('resolve Dataset config');
  // const source = config.source;

  const currentPath = computeCurrentPath(datasetRoute, config);

  // TODO: this may be a problem when auth changes
  // const hasCreatePermission = computeCreatePermission(config);

  // // TODO: this may be a problem when auth changes
  // const hasUpdatePermission = computeUpdatePermission(config);

  const isSourceEmbedded = config.source === 'embedded';

  const isSourceGenerated = config.source === 'generated';

  const hasDetailView = config.views?.detail != null;

  const hasEditView = config.views?.edit != null;

  const hasNewView = config.views?.new != null;

  const hasQuickView = config.views?.quick != null;

  const viewKey = computeRouteNameToViewKey(route.name);

  const isTableView = viewKey === View.TABLE;
  const isDetailView = viewKey === View.DETAIL;
  const isEditView = viewKey === View.EDIT;
  const isQuickView = viewKey === View.QUICK;
  const isRawView = viewKey === View.RAW;
  const isNewView = viewKey === View.NEW;

  console.timeEnd('computeDatasetConfig');
  console.groupEnd();

  return {
    domain,
    currentPath,
    config,
    hasConfig: config != null,
    datasetRoute,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    isSourceEmbedded,
    isSourceGenerated,
    source,
    isTableView,
    isDetailView,
    isEditView,
    isQuickView,
    isRawView,
    isNewView,
  };
};

const computeCurrentPath = (
  datasetRoute: DatasetRoute,
  config: DatasetConfig
) => {
  if (config == null || datasetRoute == null) {
    return undefined;
  }
  const url = config.baseUrl + '/' + datasetRoute.pathParams.join('/');

  return datasetRoute.id == null ? url : url + '/' + datasetRoute.id;
};

const computeTableView = (
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

const computeDetailView = (
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

const computeEditView = (
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

const computeNewView = (
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

const computeCurrentDomain = (domainFromRoutingParam: string | string[]) => {
  if (domainFromRoutingParam == null) {
    return 'no-dataset-domain-in-url';
  }
  const routeFromParams = stringifyParameter(domainFromRoutingParam);
  return domainIsKnownToHaveOpenApiDocument(routeFromParams)
    ? routeFromParams
    : 'unknown';
};

const computeRouteNameToViewKey = (
  name?: string | symbol | null
): ViewKey | undefined => {
  if (name == null) {
    return undefined;
  }
  switch (name) {
    case DatasetPage.DETAIL:
      return View.DETAIL;
    case DatasetPage.EDIT:
      return View.EDIT;
    case DatasetPage.NEW:
      return View.NEW;
    case DatasetPage.QUICK:
      return View.QUICK;
    case DatasetPage.RAW:
      return View.RAW;
    case DatasetPage.TABLE:
      return View.TABLE;
    default:
      return undefined;
  }
};

export const toDatasetRoute = (
  domain: DatasetDomains,
  route: RouteLocationNormalizedLoaded
): DatasetRoute => {
  const path = route.params.pathParams;
  if (path == null) {
    return { domain, pathParams: [] };
  }

  // Ensure to use an array as pathParams
  const pathParams = Array.isArray(path) ? path : path.split('/');

  // Return route without id if id is not defined
  if (route.params.id == null) {
    return { domain, pathParams };
  }

  // Ensure to use a string as id
  const id = stringifyParameter(route.params.id);
  return { domain, pathParams, id };
};

// const toArray = (s?: string | string[]) => (Array.isArray(s) ? s : [s]);
