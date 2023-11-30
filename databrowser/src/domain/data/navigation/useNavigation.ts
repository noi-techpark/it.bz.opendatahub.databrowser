// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, Ref, computed, toValue } from 'vue';
import { DatasetDomain } from '../../datasets/config/types';
import { emptyNavigation } from './emptyNavigation';
import { mobilityNavigation } from './mobilityNavigation';
import { tourismNavigation } from './tourismNavigation';
import { NavigationCallback } from './types';

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
      default: {
        return emptyNavigation();
      }
    }
  });
};
