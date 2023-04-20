import { acceptHMRUpdate, defineStore } from 'pinia';
import { LocationQuery } from 'vue-router';

interface State {
  routeQuery: LocationQuery;
}

const initialState: State = {
  routeQuery: {},
};

export const useTableViewRouteQueryStore = defineStore(
  'tableViewRouteQueryStore',
  {
    state: () => initialState,
    actions: {
      setRouteQuery(routeQuery?: LocationQuery) {
        this.routeQuery = routeQuery ?? {};
      },
    },
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTableViewRouteQueryStore, import.meta.hot)
  );
}
