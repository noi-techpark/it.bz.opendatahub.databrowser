import { Ref } from 'vue';

export type QueryParameters = Record<string, string>;

export type Actions = {
  updateQuery: (query: QueryParameters) => void;
  clear: () => void;
};

export type UseQueryAndPagination = {
  queryParameters: Ref<QueryParameters>;
  queryParametersWithDefaults: Ref<QueryParameters>;
  actions: Actions;
};

export interface UseUrlQueryRouterConfig {
  defaultQueryParameters?: QueryParameters;
}

export interface UseUrlQueryRouter {
  (config?: UseUrlQueryRouterConfig): UseQueryAndPagination;
}

export interface UseUrlQueryParameter {
  (
    name: string,
    value?: string,
    config?: {
      defaultValue?: string;
    }
  ): Ref<string | undefined>;
}
