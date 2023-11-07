import { MaybeRef, computed, toValue } from 'vue';
import { DatasetDomain } from '../../../datasetConfig/types';

// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Some domains need special path treatment for the single record views
// For example, in the "tourism" domain the "language" parameter should
// not be part of the requested URL, because it would cause usability
// problems in the edit view: if the user changes the language, the record
// must not be reloaded because that would overwrite the current changes
export const normalizedPath = (
  fullPath: string | undefined,
  datasetDomain: DatasetDomain | undefined
) => {
  if (fullPath == null) {
    return fullPath;
  }

  if (datasetDomain === 'tourism') {
    const url = new URL(fullPath);
    url.searchParams.delete('language');
    return url.toString();
  }

  return fullPath;
};

export const useNormalizePath = (
  fullPath: MaybeRef<string | undefined>,
  datasetDomain: MaybeRef<DatasetDomain | undefined>
) => computed(() => normalizedPath(toValue(fullPath), toValue(datasetDomain)));
