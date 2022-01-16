import { computed } from 'vue';
import { useApiQuery } from './apiQueryHandler';
import { QueryParameterValue } from './types';

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
  validator?: (value: QueryParameterValue) => boolean;

  /**
   * The defaultValue is returned in case no value is set.
   *
   * On API parameter update, if the new value is undefined
   * or if its validation fails, the defaultValue will be
   * used as update value instead.
   */
  defaultValue?: QueryParameterValue;
}

/**
 * Provide a reactive api parameter.
 *
 * Note that by definition, updating the parameter with a
 * value of "undefined" removes the parameter from the API
 * parameters set.
 */
export const useApiParameter = (
  name: string,
  options?: ApiParameterOptions
) => {
  const { validator, defaultValue } = options ?? {};
  const { currentQueryParameters, updateQueryParameterValue } = useApiQuery();

  const hasValidator = validator != null;

  return computed({
    get: () => {
      const value = currentQueryParameters.value?.[name];
      return value ?? defaultValue;
    },
    set: (value) => {
      if (value === undefined) {
        updateQueryParameterValue(name, defaultValue);
        return;
      }

      if (!hasValidator) {
        updateQueryParameterValue(name, value);
        return;
      }

      const valid = validator(value);
      const nextValue = valid ? value : defaultValue;
      updateQueryParameterValue(name, nextValue);
    },
  });
};
