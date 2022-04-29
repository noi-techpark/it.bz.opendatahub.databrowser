import { App, ComputedRef, Ref, WritableComputedRef } from 'vue';

export type ParameterValue = string | null | (string | null)[];

export type ApiParameters = Record<string, ParameterValue>;

export interface ApiParameterOptions {
  /**
   * A validator function invoked when the parameter is updated.
   *
   * If this function is undefined, no validation will be
   * performed, the value is used.
   *
   * If this function is defined and the validation was
   * successful (returns true), the value is used.
   *
   * If this function is defined and the validation failed,
   * the defaultValue is used.
   */
  validator?: (value: ParameterValue) => boolean;

  /**
   * The defaultValue is returned in case no value is set.
   *
   * On API parameter update, if the new value is undefined
   * or if its validation fails, the defaultValue will be
   * used as update value instead.
   */
  defaultValue?: ParameterValue;
}

export interface ApiQuery {
  currentApiParameters: Ref<ApiParameters>;
  defaultApiParameters: Ref<ApiParameters>;
  allApiParameters: Ref<ApiParameters>;
  cleanApiParameters: Ref<ApiParameters>;
  setApiParameters(apiParameters: ApiParameters): void;
  updateApiParameterValue(name: string, value?: ParameterValue): void;
  setDefaultApiParameters(apiParameters: ApiParameters): void;
  useApiParameter: (
    name: string,
    options?: ApiParameterOptions
  ) => WritableComputedRef<ParameterValue | undefined>;
  updateApiParameterValidator: (
    name: string,
    validator?: (value: ParameterValue) => boolean
  ) => void;
  cleanApiParametersExtendWith: (apiParameters: ApiParameters) => ApiParameters;
  install(app: App): void;
}

export type ApiParameterValidator = (value: ParameterValue) => boolean;

export type UrlParameters = ApiParameters;
export interface UrlQuery {
  useUrlWithQueryParameters: (url: string | Ref<string>) => ComputedRef<string>;
  cleanQueryParametersExtendedWith: (
    apiParameters: UrlParameters
  ) => UrlParameters;
  install: (app: App) => void;
}
