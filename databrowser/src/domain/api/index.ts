// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export { useAxiosFileDownloader } from './client/axiosFetcher';
export * from './pagination/types';
export { stringifyParameter } from './service/query';
export * from './service/types';
export {
  buildTargetFromArrayMapping,
  buildTargetFromMapping,
  buildTargetFromObjectMapping,
  isObjectMappingEmpty,
  useAsList,
  useAsSet,
} from './service/utils';
