// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasetConfig/types';

export const licenseInfoCategory = (): DetailElements => ({
  name: 'License',
  slug: 'license',
  subcategories: [
    {
      name: '',
      properties: [
        {
          title: 'License',
          component: CellComponent.SelectWithOptionsCell,
          propertyMappings: { value: 'LicenseInfo.License' },
          params: {
            value_001: 'CC0',
            label_001: 'CC0',
            value_002: 'CC-BY',
            label_002: 'CC-BY',
            value_003: 'Closed',
            label_003: 'Closed',
          },
        },
        {
          title: 'Author',
          component: CellComponent.StringCell,
          propertyMappings: { text: 'LicenseInfo.Author' },
        },
        {
          title: 'License Holder',
          component: CellComponent.UrlCell,
          propertyMappings: { text: 'LicenseInfo.LicenseHolder' },
        },
        {
          title: 'Closed Data',
          component: CellComponent.ToggleCell,
          propertyMappings: { enabled: 'LicenseInfo.ClosedData' },
        },
      ],
    },
  ],
});
