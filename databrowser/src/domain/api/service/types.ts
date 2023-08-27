// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { App, ComputedRef, Ref, WritableComputedRef } from 'vue';

export type ParameterValue = string | null | (string | null)[];

export type ApiParameters = Record<string, ParameterValue>;

export type ApiParams = Record<string, string>;

export interface ApiParameterOptions {
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
  cleanApiParametersExtendWith: (apiParameters: ApiParameters) => ApiParameters;
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
