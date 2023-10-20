// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  licenseInfoCategory,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const webcamInfoSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [
            idReadOnlyCell(),
            {
              title: 'Area Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'AreaIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    gpsDataCategory(),
    odhTagCategory(),
    {
      name: 'Webcam Details',
      slug: 'Webcam Details',
      subcategories: [
        {
          name: 'Webcam Details',
          properties: [
            {
              title: 'Image URL',
              component: CellComponent.UrlCell,
              fields: { text: 'WebCamProperties.WebcamUrl' },
            },
            {
              title: 'Stream URL',
              component: CellComponent.UrlCell,
              fields: { text: 'WebCamProperties.StreamUrl' },
            },
            {
              title: 'Preview URL',
              component: CellComponent.UrlCell,
              fields: { text: 'WebCamProperties.PreviewUrl' },
            },
          ],
        },
      ],
    },
    imageGalleryCategory({ resizeImages: false }),
    textInfoCategory(),
    contactCategory(),
    licenseInfoCategory(),
  ],
});
