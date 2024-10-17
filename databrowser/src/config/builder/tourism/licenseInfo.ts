// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasets/config/types';

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
          objectMapping: { value: 'LicenseInfo.License' },
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
          objectMapping: { text: 'LicenseInfo.Author' },
        },
        {
          title: 'License Holder',
          component: CellComponent.UrlCell,
          objectMapping: { text: 'LicenseInfo.LicenseHolder' },
        },
        {
          title: 'Closed Data',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: { enabled: 'LicenseInfo.ClosedData' },
        },
      ],
    },
  ],
});
