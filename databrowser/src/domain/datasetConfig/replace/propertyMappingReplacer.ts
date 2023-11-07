// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { PropertyMappings } from '../types';

export type PropertyMappingsReplacer = (
  propertyMappings?: PropertyMappings
) => PropertyMappings;

export type PathParam = string;
export type Replacement = string;

// Builder function to create a function that replaces all (dynamic) path params in
// property mapping objects with the corresponding replacement
export const buildPropertyMappingReplacer = (
  paramsReplacer: (s: string) => string
): PropertyMappingsReplacer => {
  // Utility function to replace all (dynamic) path params in a property mapping object
  // with the corresponding replacements
  return (propertyMappings?: PropertyMappings) => {
    if (propertyMappings == null) {
      return {};
    }

    return Object.entries(propertyMappings).reduce<PropertyMappings>(
      (prev, [targetPropertyName, propertyPath]) => ({
        ...prev,
        [targetPropertyName]: paramsReplacer(propertyPath),
      }),
      {}
    );
  };
};

export const usePropertyMappingReplacer = (
  paramsReplacer: MaybeRef<(s: string) => string>
) => computed(() => buildPropertyMappingReplacer(toValue(paramsReplacer)));
