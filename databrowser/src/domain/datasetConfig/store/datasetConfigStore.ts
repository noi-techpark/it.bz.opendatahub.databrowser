import { View, ViewKey, DatasetRoute, DatasetConfig } from '../types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { initialState } from './initialState';
import { markRaw } from 'vue';
import { useAuth } from '../../auth/store/auth';
import { resolveDatasetConfig } from '../resolver';
import { SourceType } from '../source/types';

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
    hasDetailView: (state) => state.config?.views?.detail != null,
    hasEditView: (state) => state.config?.views?.edit != null,
    hasNewView: (state) => state.config?.views?.new != null,
    hasQuickView: (state) => state.config?.views?.quick != null,
    hasRawView: (state) => state.config?.views?.raw != null,
    hasTableView: (state) => state.config?.views?.table != null,
    hasUpdatePermission(): boolean {
      const auth = useAuth();
      const updateRoles = this.config?.operations?.update?.rolesAllowed;
      return updateRoles != null ? auth.hasAnyRole(updateRoles) : false;
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
      this.viewKey = undefined;
      this.config = undefined;
      this.source = undefined;
      this.datasetRoute = undefined;
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
      this.config = markRaw(config);
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
        const config = await resolveDatasetConfig(datasetRoute, {
          source: this.source,
        });
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
