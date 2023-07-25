// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { View, ViewKey, DatasetRoute, DatasetConfig } from '../types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { initialState } from './initialState';
import { useAuth } from '../../auth/store/auth';
import { resolveDatasetConfig } from '../resolver';
import { SourceType } from '../source/types';
import { embeddedDatasetConfigs } from '../../../config/config';
import { useReplaceWithApiParameters } from '../../api';
import * as R from 'ramda';

export const useDatasetConfigStore = defineStore('datasetConfigStore', {
  state: () => initialState,
  getters: {
    hasConfig: (state) => state.config != null,
    currentPath(): string | undefined {
      if (this.config == null || this.datasetRoute == null) {
        return undefined;
      }
      const url =
        this.config.baseUrl + '/' + this.datasetRoute.pathParams.join('/');

      return this.datasetRoute.id == null
        ? url
        : url + '/' + this.datasetRoute.id;
    },
    newView: (state) => state.config?.views?.new,
    detailView: (state) => state.config?.views?.detail,
    editView: (state) => state.config?.views?.edit,
    quickView: (state) => state.config?.views?.quick,
    rawView: (state) => state.config?.views?.raw,
    tableView: (state) => state.config?.views?.table,
    isDetailView: (state) => state.viewKey === View.DETAIL,
    isEditView: (state) => state.viewKey === View.EDIT,
    isNewView: (state) => state.viewKey === View.NEW,
    isQuickView: (state) => state.viewKey === View.QUICK,
    isRawView: (state) => state.viewKey === View.RAW,
    isTableView: (state) => state.viewKey === View.TABLE,
    isSourceEmbedded: (state) => state.source === 'embedded',
    isSourceGenerated: (state) => state.source === 'generated',
    hasDetailView: (state) => state.config?.views?.detail != null,
    hasEditView: (state) => state.config?.views?.edit != null,
    hasNewView: (state) => state.config?.views?.new != null,
    hasQuickView: (state) => state.config?.views?.quick != null,
    hasRawView: (state) => state.config?.views?.raw != null,
    hasTableView: (state) => state.config?.views?.table != null,
    hasCreatePermission(): boolean {
      const auth = useAuth();
      const roles = this.config?.operations?.create?.rolesAllowed;
      return roles != null ? auth.hasAnyRole(roles) : false;
    },
    hasUpdatePermission(): boolean {
      const auth = useAuth();
      const roles = this.config?.operations?.update?.rolesAllowed;
      return roles != null ? auth.hasAnyRole(roles) : false;
    },
  },
  actions: {
    clear() {
      this.viewKey = undefined;
      this.config = undefined;
      this.source = undefined;
      this.datasetRoute = undefined;
      this.resolution = {
        state: 'empty',
        error: undefined,
      };
    },
    setPending() {
      this.resolution = {
        state: 'pending',
        error: undefined,
      };
    },
    setError(error: unknown) {
      this.config = undefined;
      this.source = undefined;
      const message: string =
        error instanceof Error ? error.message : (error as string);
      this.resolution = {
        state: 'error',
        error: message,
      };
    },
    setSuccess(
      viewKey: ViewKey,
      datasetRoute: DatasetRoute,
      config: DatasetConfig
    ) {
      this.viewKey = viewKey;
      this.config = config;
      this.source = config.source;
      this.datasetRoute = datasetRoute;
      this.resolution = {
        state: 'success',
        error: undefined,
      };
    },
    async resolve(viewKey: ViewKey, datasetRoute: DatasetRoute) {
      this.viewKey = viewKey;

      this.setPending();
      try {
        const resolvedConfig = await resolveDatasetConfig(datasetRoute, {
          source: this.source,
        });

        let config = { ...resolvedConfig };

        const { replace } = useReplaceWithApiParameters();
        const replaceFields = (fields?: Record<string, string>) => {
          return fields == null
            ? {}
            : Object.entries(fields).reduce(
                (prev, [key, value]) => ({
                  ...prev,
                  [key]: replace(value),
                }),
                {}
              );
        };

        // Replace placeholders in detail config
        if (viewKey === 'detail' && config.views?.detail?.elements != null) {
          config = {
            ...config,
            views: {
              ...config.views,
              detail: {
                ...config.views.detail,
                elements: config.views.detail.elements.map((element) => ({
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
                })),
              },
            },
          };
        }

        // Replace placeholders in edit config
        if (viewKey === 'edit' && config.views?.edit?.elements != null) {
          config = {
            ...config,
            views: {
              ...config.views,
              edit: {
                ...config.views.edit,
                elements: config.views.edit.elements.map((element) => ({
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
                })),
              },
            },
          };
        }

        // Replace placeholders in table config
        if (viewKey === 'table' && config.views?.table?.elements != null) {
          config = {
            ...config,
            views: {
              ...config.views,
              table: {
                ...config.views.table,
                elements: config.views.table.elements.map((element) => ({
                  ...element,
                  listFields: undefined,
                  fields: replaceFields(element.fields),
                })),
              },
            },
          };
        }

        console.log(
          'config',
          JSON.parse(JSON.stringify(config.views?.table?.elements[4].fields))
        );
        console.log(R.view(R.lensPath(['views', 'table', 'elements']), config));

        this.setSuccess(viewKey, datasetRoute, config);
      } catch (error) {
        this.setError(error);
      }
    },
    async changeSource(source: SourceType) {
      this.source = source;

      if (this.viewKey == null) {
        this.setError(
          'View key in dataset config store is empty, but required to change the source. Maybe you need to resolve a config first.'
        );
        return;
      }

      if (this.datasetRoute == null) {
        this.setError(
          'Dataset route in dataset config store is empty, but required to change the source. Maybe you need to resolve a config first.'
        );
        return;
      }

      await this.resolve(this.viewKey, this.datasetRoute);
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetConfigStore, import.meta.hot)
  );
}

// Add support for datasetConfig config hot-module-reload
if (import.meta.hot) {
  // Need to reference module whose changes should trigger config calculations
  embeddedDatasetConfigs;

  // Watch for changes in the config file
  import.meta.hot.accept('../../../config/config', (config) => {
    if (config != null) {
      const store = useDatasetConfigStore();
      if (store.viewKey != null && store.datasetRoute != null) {
        // Need some time for data to settle
        setTimeout(() => store.resolve(store.viewKey!, store.datasetRoute!));
      }
    }
  });
}
