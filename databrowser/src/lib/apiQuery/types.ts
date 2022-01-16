import { App, Ref } from 'vue';

export type QueryParameterValue = string | null | (string | null)[];

export type QueryParameters = Record<string, QueryParameterValue>;

export interface ApiQuery {
  currentQueryParameters: Ref<QueryParameters>;
  setQueryParameters(queryParameters: QueryParameters): void;
  updateQueryParameterValue(name: string, value?: QueryParameterValue): void;
  install(app: App): void;
}
