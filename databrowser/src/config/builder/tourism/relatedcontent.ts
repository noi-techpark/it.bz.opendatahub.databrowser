// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const relatedcontentCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.RelatedContentCell,
  arrayMapping: {
    targetPropertyName: 'relatedcontent',
    pathToParent: 'RelatedContent',
    objectMapping: {
      id: 'Id',
      type: 'Type',
    },
  },
});

export const relatedcontentCategory = (): DetailElements => ({
  name: 'Related Content',
  slug: 'related-content',
  subcategories: [
    {
      name: '',
      properties: [relatedcontentCell()],
    },
  ],
});
