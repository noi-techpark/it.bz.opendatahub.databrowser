// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export { useApiMutate } from './client/useApiMutation';
export { useAxiosFetcher, useAxiosFileDownloader } from './client/axiosFetcher';
export * from './pagination/types';
export { stringifyParameter } from './service/query';
export {
  buildTargetObject,
  isPropertyMappingsEmpty,
  replacePlaceholders,
  useAsList,
  useAsSet,
  usePropertyMapping,
} from './service/utils';
export * from './service/types';
