import { AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { Ref } from 'vue';
import { SelectOption } from '../../../../../components/select/types';

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
        const v = get(item, keySelector.value);
        const l = get(item, labelSelector.value);
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
