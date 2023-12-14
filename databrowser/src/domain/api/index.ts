// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export {
  buildAuthInterceptor,
  useBaseAxiosFetch,
  useBaseAxiosMutate,
  useAxiosFileDownloader,
} from './axiosFetcher';
export {
  buildTargetFromArrayMapping,
  buildTargetFromMapping,
  buildTargetFromObjectMapping,
  isObjectMappingEmpty,
} from './utils';
