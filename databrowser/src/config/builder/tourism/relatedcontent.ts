// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const relatedcontentCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.RelatedContentCell,
  listFields: {
    attributeName: 'relatedcontent',
    pathToParent: 'RelatedContent',
    propertyMappings: {
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
