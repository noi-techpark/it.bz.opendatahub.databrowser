// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CandidateConfig, DatasetConfig } from './types';

// Apply default values to query params if they are not set
export const stringifyRouteQueryValues = (
  query: Record<string, string | null | (string | null)[]>
): Record<string, string> =>
  // Remove all keys with null values and convert all values to strings
  Object.entries(query).reduce<Record<string, string>>((prev, [key, value]) => {
    if (value == null) {
      return prev;
    }
    return { ...prev, [key]: Array.isArray(value) ? value.join(',') : value };
  }, {});

/**
 * Find candidate configs for the given path params.
 *
 * The higher the rank of a candidate, the more specific it is.
 *
 * @param pathParams The path params to find candidate configs for, e.g. ['one', 'two']
 * would give a final path of /one/two.
 * @param configs A record of dataset configs.
 * @returns An array of candidate configs, sorted by rank.
 */
export const findCandidateConfigs = (
  pathParams: string[],
  configs: Record<string, DatasetConfig>
): CandidateConfig[] => {
  const candidates = Object.entries(configs).reduce<
    {
      rank: number;
      config: DatasetConfig;
    }[]
  >((prev, [candidatePath, config]) => {
    // candidatePath is expected to start with a slash, e.g. /v1/param1
    const candidatePathParams = candidatePath.split('/').slice(1);

    // If the path lengths are different, the candidate is not valid
    const pathLength = pathParams.length;
    if (candidatePathParams.length !== pathLength) {
      return prev;
    }

    // Compute rank
    const rank = candidatePathParams.reduce<number>((prev, param, index) => {
      // If the param is equal, the rank is increased by the square of the
      // distance from the end of the path. This leads to a higher rank for
      // path matches at the beginning of the path.
      // Example: /v1/param1/param2/param3 -> pathLength: 4
      // path: /v1/param1/param2/param3 -> rank: 4^2 + 3^2 + 2^2 + 1^1 = 30
      if (param === pathParams[index]) {
        return Math.pow(pathLength - index, 2) + prev;
      }

      // If the param is a dynamic path param (e.g. {somevalue}), the rank is
      // not increased. This leads to a lower rank for path matches with
      // dynamic path params.
      if (param.startsWith('{') && param.endsWith('}')) {
        return prev;
      }

      // If the param is not equal and not a dynamic path param, the rank is
      // set to -Infinity. This leads to the lowest rank for paths that do not
      // match at all.
      return -Infinity;
    }, 0);

    return rank > -Infinity ? [...prev, { rank, config }] : prev;
  }, []);

  candidates.sort((a, b) => b.rank - a.rank);

  return candidates;
};
