// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const pushconfigCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.PushConfigCell,
  arrayMapping: {
    targetPropertyName: 'pushconfigs',
    pathToParent: 'PushConfig',
    objectMapping: {
      baseurl: 'BaseUrl',
      pathparam: 'PathParam',
      pushapiurl: 'PushApiUrl',
    },
  },
});

export const pushconfigCategory = (): DetailElements => ({
  name: 'Pushconfig Details',
  slug: 'pushconfig-details',
  subcategories: [
    {
      name: '',
      properties: [pushconfigCell()],
    },
  ],
});
