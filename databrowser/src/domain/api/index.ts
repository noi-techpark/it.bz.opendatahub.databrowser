// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export { defaultPagination } from './client/defaultValues';
export { useApiRead, useApiReadForCurrentDataset } from './client/useApiRead';
export {
  useApiCreate,
  useApiDelete,
  useApiUpdate,
  useApiMutate,
} from './client/useApiMutation';
export { unifyPagination } from './client/mapper';
export {
  useAxiosFetcher,
  useAxiosFileDownloader,
} from './client/fetcher/axios';
export * from './client/types';

export { createApiQueryHandler, useApiQuery } from './service/apiQueryHandler';
export { stringifyParameter } from './service/query';
export { createUrlQueryHandler, useUrlQuery } from './service/urlQueryHandler';
export {
  isFieldsEmpty,
  replacePlaceholders,
  useApiParameterReplacements,
  useAsList,
  useAsSet,
  usePropertyMapping,
  useReplaceWithApiParameters,
} from './service/utils';
export * from './service/types';
