// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { buildTargetObject } from '../../api';
import { PropertyMappingsReplacer } from '../replace/propertyMappingReplacer';

export type DataExtractor = (data: unknown, path: string) => unknown;

/**
 * Build a function that extracts the value of a property from an object.
 */
export const buildValueByPathExtractor =
  (propertyMappingReplacer: PropertyMappingsReplacer): DataExtractor =>
  (data: unknown, path: string) => {
    const fieldWithReplacements = propertyMappingReplacer({
      value: path,
    });
    return buildTargetObject(data, fieldWithReplacements).value;
  };

export const useValueByPathExtractor = (
  propertyMappingReplacer: MaybeRef<PropertyMappingsReplacer>
) =>
  computed(() => buildValueByPathExtractor(toValue(propertyMappingReplacer)));
