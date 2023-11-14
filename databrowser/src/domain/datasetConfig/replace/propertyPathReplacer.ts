// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { ObjectMapping } from '../types';
import { PropertyPathReplacer } from './types';

// Builder function to create a function that replaces all (dynamic) path params in
// property mapping objects with the corresponding replacement
export const buildPropertyPathReplacer = (
  paramsReplacer: (s: string) => string
): PropertyPathReplacer => {
  // Utility function to replace all (dynamic) path params in a object mapping
  // with the corresponding replacements
  return (objectMapping?: ObjectMapping) => {
    if (objectMapping == null) {
      return {};
    }

    return Object.entries(objectMapping).reduce<ObjectMapping>(
      (prev, [targetPropertyName, propertyPath]) => ({
        ...prev,
        [targetPropertyName]: paramsReplacer(propertyPath),
      }),
      {}
    );
  };
};

export const usePropertyPathReplacer = (
  paramsReplacer: MaybeRef<(s: string) => string>
) => computed(() => buildPropertyPathReplacer(toValue(paramsReplacer)));
