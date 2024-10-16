// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';
import { withOdhBaseUrl } from '../../utils';

export const tagCell = (mainentity?: string): PropertyConfig => {
  const filterParam = mainentity == null ? '' : `?mainentity=${mainentity}`;
  const url = withOdhBaseUrl('/v1/Tag') + filterParam;

  return {
    title: 'Assigned Tags',
    component: CellComponent.TagReferenceCell,
    arrayMapping: {
      targetPropertyName: 'items',
      pathToParent: 'TagIds',
    },
    params: { url, keySelector: 'Id', labelSelector: 'TagName.{language}' },
  };
};

export const tagCategory = (mainentity?: string): DetailElements => {
  return {
    name: 'Tags (v2)',
    slug: 'Tags (v2)',
    subcategories: [
      {
        name: '',
        properties: [tagCell(mainentity)],
      },
    ],
  };
};
