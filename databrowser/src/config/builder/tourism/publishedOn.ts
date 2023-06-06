// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const publishedOnCell = (): PropertyConfig => {
  return {
    title: 'Published on',
    component: CellComponent.ArrayLookupCell,
    fields: { items: 'PublishedOn' },
    params: {
      lookupUrl: withOdhBaseUrl('/v1/Publisher'),
      labelSelector: 'Name.{language}',
      keySelector: 'Id',
      unique: 'true',
    },
  };
};
