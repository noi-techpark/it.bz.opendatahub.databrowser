// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const eventDocumentCell = (): PropertyConfig => ({
  title: 'PDFs',
  component: CellComponent.EventDocumentCell,
  arrayMapping: {
    targetPropertyName: 'files',
    pathToParent: 'Documents.{language}',
    objectMapping: {
      src: 'DocumentURL',
      language: 'Language',
      documentName: 'DocumentName',
    },
  },
});

export const eventDocumentCategory = (): DetailElements => ({
  name: 'Files',
  slug: 'files',
  subcategories: [
    {
      name: '',
      properties: [eventDocumentCell()],
    },
  ],
});
