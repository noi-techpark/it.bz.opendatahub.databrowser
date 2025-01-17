// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useObjectValueReplacer } from '../../../config/mapping/objectValueReplacer';
import { useStringReplacer } from '../../../config/mapping/stringReplacer';
import { defaultLanguage } from '../../../language';
import { stringifyRouteQuery } from '../../../location/stringifyQuery';
import { ListViewConfigWithType } from '../../../view/types';
import { computedAsync } from '@vueuse/core';
import { loadDatasetConfig } from '../../../config/load/datasetConfigLoader';
import { DatasetConfig, PropertyConfig } from '../../../config/types';
import { computeDynamicParamsReplacement } from '../../../view/modifiers/dynamicParams/dynamicParamsReplacement';
import { extractView } from '../../../view/modifiers/extractView/ViewKey';
import { TourismMetaData } from '../../../../metaDataConfig/tourism/types';

export const useViewElements = (
  recordUrl: Ref<string | undefined>,
  currentDataset: Ref<TourismMetaData | undefined>
) => {
  const router = useRouter();
  const language = computed(() => {
    return stringifyRouteQuery({
      language: router.currentRoute.value.query.language ?? defaultLanguage,
    });
  });
  const stringReplacer = useStringReplacer(language);
  const objectValueReplacer = useObjectValueReplacer(stringReplacer);

  const config = computedAsync<DatasetConfig | undefined>(async () => {
    if (recordUrl.value == null || currentDataset.value == null) {
      return;
    }

    const apiType = currentDataset.value.apiType;

    if (apiType === 'unknown') {
      console.error(
        'Unknown API type, trying to build generated view config',
        currentDataset.value
      );
      return;
    }

    if (apiType === 'content') {
      const { pathname } = new URL(recordUrl.value);
      const path = pathname.split('/').filter((part) => part.length > 0);
      // Remove the last part, which is the record ID
      path.pop();
      return await loadDatasetConfig('embedded', 'tourism', path);
    }

    if (apiType === 'timeseries') {
      const { pathname } = new URL(recordUrl.value);
      const path = pathname.split('/').filter((part) => part.length > 0);
      return await loadDatasetConfig('embedded', 'mobility', path);
    }
  });

  const viewElements = computed<PropertyConfig[]>(() => {
    if (config.value == null) {
      return [];
    }

    const apiType = currentDataset.value?.apiType;

    if (apiType === 'unknown') {
      console.error(
        'Unknown API type, trying to build generated view config',
        currentDataset.value
      );
      return [];
    }

    if (apiType === 'content') {
      const viewFromDatasetConfig = extractView(config.value?.views, 'table');
      const replacedParams = computeDynamicParamsReplacement(
        'tourism',
        viewFromDatasetConfig,
        stringReplacer.value,
        objectValueReplacer.value
      ) as ListViewConfigWithType;

      return replacedParams.elements ?? [];
    }

    if (apiType === 'timeseries') {
      return config.value?.views?.table?.elements ?? [];
    }

    return [];
  });

  return { viewElements };
};
