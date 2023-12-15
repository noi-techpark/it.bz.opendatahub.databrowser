// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { extractValueByPath } from './utils';
import { StringReplacer } from '../../view/types';

export type DataExtractor = (data: unknown, path: string) => unknown;

/**
 * Build a function that extracts the value of a property from an object.
 */
export const buildValueExtractor =
  (stringReplacer: StringReplacer): DataExtractor =>
  (data: unknown, path: string) => {
    const pathWithReplacedParams = stringReplacer(path);
    return extractValueByPath(data, pathWithReplacedParams);
  };

export const useValueExtractor = (stringReplacer: MaybeRef<StringReplacer>) =>
  computed(() => buildValueExtractor(toValue(stringReplacer)));
