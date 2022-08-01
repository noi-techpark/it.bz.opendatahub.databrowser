import { AxiosResponse } from 'axios';
import { Ref } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import * as R from 'ramda';

export const buildMapper =
  (
    keySelector: Ref<string>,
    labelSelector: Ref<string>,
    value?: Ref<string | boolean | number | undefined>,
    required?: Ref<boolean | undefined>
  ) =>
  (axiosResponse: unknown): SelectOption[] => {
    const data = (axiosResponse as AxiosResponse<unknown[]>).data;

    const mappedData = data
      .map((item) => {
        const v = getPropertyValue(item, keySelector.value);
        const l = getPropertyValue(item, labelSelector.value);
        const selected = value?.value === v;
        return {
          value: v,
          label: l,
          selected,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    return required?.value === true
      ? mappedData
      : [{ label: '--- Please select ---', value: '' }, ...mappedData];
  };

const getPropertyValue = (item: unknown, jsonPath: string) => {
  const path = jsonPath.split('.');
  const lensePath = R.lensPath(path);
  return R.view(lensePath, item);
};
