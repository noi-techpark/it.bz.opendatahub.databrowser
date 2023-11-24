// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetDomain } from '../../datasetConfig/types';
import { emptyNavigation } from './emptyNavigation';
import { NavigationCallback } from './types';
import { tourismNavigation } from './tourismNavigation';
import { mobilityNavigation } from './mobilityNavigation';
import { MaybeRef, Ref, computed, toValue } from 'vue';

export const useNavigationCallback = (
  domain: MaybeRef<DatasetDomain | undefined>
): Ref<NavigationCallback> => {
  return computed(() => {
    const domainValue = toValue(domain);

    if (
      domainValue == null ||
      domainValue === 'no-dataset-domain-in-url' ||
      domainValue === 'unknown'
    ) {
      return emptyNavigation();
    }

    switch (domainValue) {
      case 'tourism': {
        return tourismNavigation();
      }
      case 'mobility': {
        return mobilityNavigation();
      }
    }

    return emptyNavigation();
  });
};
