// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { ObjectMapping } from '../types';
import { ObjectValueReplacer } from '../../view/types';

// Builder function to create a function that replaces all (dynamic) path params in
// object values with the corresponding replacement
export const buildObjectValueReplacer = (
  stringReplacer: (s: string) => string
): ObjectValueReplacer => {
  // Utility function to replace all (dynamic) path params in a object mapping
  // with the corresponding replacements
  return (objectMapping?: ObjectMapping) => {
    if (objectMapping == null) {
      return {};
    }

    return Object.entries(objectMapping).reduce<ObjectMapping>(
      (prev, [targetPropertyName, propertyPath]) => ({
        ...prev,
        [targetPropertyName]: stringReplacer(propertyPath),
      }),
      {}
    );
  };
};

export const useObjectValueReplacer = (
  stringReplacer: MaybeRef<(s: string) => string>
) => computed(() => buildObjectValueReplacer(toValue(stringReplacer)));
