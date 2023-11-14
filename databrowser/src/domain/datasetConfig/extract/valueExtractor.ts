// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { ParamsReplacer } from '../replace/types';
import { extractValueByPath } from '../../api/service/utils';

export type DataExtractor = (data: unknown, path: string) => unknown;

/**
 * Build a function that extracts the value of a property from an object.
 */
export const buildValueExtractor =
  (paramsReplacer: ParamsReplacer): DataExtractor =>
  (data: unknown, path: string) => {
    const pathWithReplacedParams = paramsReplacer(path);
    return extractValueByPath(data, pathWithReplacedParams);
  };

export const useValueExtractor = (paramsReplacer: MaybeRef<ParamsReplacer>) =>
  computed(() => buildValueExtractor(toValue(paramsReplacer)));
