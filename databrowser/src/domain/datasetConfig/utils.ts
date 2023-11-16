// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CandidateConfig, DatasetConfig, PathSegments } from './types';

/**
 * Find candidate configs for the given path params.
 *
 * The higher the rank of a candidate, the more specific it is.
 *
 * @param pathSegments The path segments to find candidate configs for.
 * For example, the path segments ['one', 'two'] translate to a path of /one/two.
 * @param configs A record of dataset configs.
 * @returns An array of candidate configs, sorted by rank.
 */
export const findCandidateConfigs = (
  pathSegments: PathSegments,
  configs: Record<string, DatasetConfig>
): CandidateConfig[] => {
  const candidates = Object.entries(configs).reduce<
    {
      rank: number;
      config: DatasetConfig;
    }[]
  >((prev, [candidatePath, config]) => {
    // candidatePath is expected to start with a slash, e.g. /v1/param1
    const candidatePathSegments = candidatePath.split('/').slice(1);

    // If the path lengths are different, the candidate is not valid
    const pathSegmentsLength = pathSegments.length;
    if (candidatePathSegments.length !== pathSegmentsLength) {
      return prev;
    }

    // Compute rank
    const rank = candidatePathSegments.reduce<number>((prev, param, index) => {
      // If the param is equal, the rank is increased by the square of the
      // distance from the end of the path. This leads to a higher rank for
      // path matches at the beginning of the path.
      // Example: /v1/param1/param2/param3 -> pathLength: 4
      // path: /v1/param1/param2/param3 -> rank: 4^2 + 3^2 + 2^2 + 1^1 = 30
      if (param === pathSegments[index]) {
        return Math.pow(pathSegmentsLength - index, 2) + prev;
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
