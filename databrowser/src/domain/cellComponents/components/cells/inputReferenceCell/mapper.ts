import { AxiosResponse } from 'axios';
import { computed, ref, Ref, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import * as R from 'ramda';
import {
  replacePlaceholders,
  useApiParameterReplacements,
} from '../../../../api';

export const useMapper = (
  data: Ref<undefined> | Ref<AxiosResponse<unknown[], any>>,
  initialValue: Ref<string | boolean | number | unknown>,
  keySelector: Ref<string>,
  labelSelector: Ref<string>,
  sortByLabel: Ref<boolean>,
  emptyAllowed: Ref<boolean>
) => {
  const options = ref<SelectOption[]>([]);

  const replacements = useApiParameterReplacements();

  watch(
    () => [data.value, initialValue.value, replacements.value],
    () => {
      if (data.value == null) {
        return;
      }

      // Compute key and value selectors with replacements (e.g. current language)
      const replace = (s: string): string =>
        replacePlaceholders(s, replacements.value);
      const keySelectorWithReplacements = replace(keySelector.value);
      const labelSelectorWithReplacements = replace(labelSelector.value);

      options.value = data.value.data.map((item) => {
        const v = getPropertyValue(item, keySelectorWithReplacements);
        const l = getPropertyValue(item, labelSelectorWithReplacements);
        const selected = initialValue?.value === v;
        return {
          value: v,
          label: l ?? v,
          selected,
        };
      });

      if (sortByLabel) {
        options.value.sort((a, b) => a.label.localeCompare(b.label));
      }

      if (emptyAllowed.value) {
        options.value = [
          { label: '--- No value ---', value: '' },
          ...options.value,
        ];
      }
    },
    { immediate: true }
  );

  const unknownValue = computed(
    () =>
      initialValue.value != null &&
      options.value.find((o) => o.selected === true) == null
  );

  return { options, unknownValue };
};

const getPropertyValue = (item: unknown, jsonPath: string) => {
  const path = jsonPath.split('.');
  const lensePath = R.lensPath(path);
  return R.view(lensePath, item);
};
