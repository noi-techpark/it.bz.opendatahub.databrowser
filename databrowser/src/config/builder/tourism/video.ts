// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const videoItemsCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.EditVideoItemsCell,
  arrayMapping: {
    targetPropertyName: 'videos',
    pathToParent: 'VideoItems.{language}',
    objectMapping: {
      name: 'Name',
      url: 'Url',
      videoSource: 'VideoSource',
      videoType: 'VideoType',
      streamingSource: 'StreamingSource',
      videoTitle: 'VideoTitle',
      videoDesc: 'VideoDesc',
      active: 'Active',
      copyright: 'CopyRight',
      license: 'License',
      licenseHolder: 'LicenseHolder',
      language: 'Language',
      width: 'Width',
      height: 'Height',
      bitrate: 'Bitrate',
      duration: 'Duration',
      definition: 'Definition',
      resolution: 'Resolution',
    },
  },
});

export const videoItemsCategory = (): DetailElements => ({
  name: 'Videos',
  slug: 'videos',
  subcategories: [
    {
      name: '',
      properties: [videoItemsCell()],
    },
  ],
});
