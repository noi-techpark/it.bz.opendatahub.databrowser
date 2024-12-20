// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withOdhBaseUrl } from '../../config/utils';
import { unwrapData } from '../api/dataExtraction';
import { useApiRead } from '../api/useApi';
import { WithTourismPagination } from '../datasets/pagination/types';
import { TourismPublisher } from './types';

interface OdhPublisher {
  Id: string;
  Key: string;
  Name: Record<string, string>;
  PushConfig: {}[];
}

const publisherUrl = withOdhBaseUrl('/v1/Publisher?pagesize=100');

export const usePublisher = () =>
  useApiRead(publisherUrl, { select, queryKey: [publisherUrl] });

const select = (
  data: WithTourismPagination<OdhPublisher[]>
): TourismPublisher[] => {
  // Unwrap data from pagination
  const unwrappedData = unwrapData<OdhPublisher[]>(data);
  return unwrappedData
    .filter((publisher) => publisher.PushConfig?.length > 0)
    .map<TourismPublisher>((publisher) => ({
      id: publisher.Id,
      key: publisher.Key,
      name: publisher.Name,
    }));
};
