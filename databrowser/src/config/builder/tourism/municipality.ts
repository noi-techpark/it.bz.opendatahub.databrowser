// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const municipalityIdCell = (text: string): PropertyConfig => ({
  title: 'Municipality',
  component: CellComponent.InputReferenceCell,
  objectMapping: { value: text },
  params: {
    url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
    labelSelector: 'Detail.en.Title',
    keySelector: 'Id',
  },
  required: true,
});
