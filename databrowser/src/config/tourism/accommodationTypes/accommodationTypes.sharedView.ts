// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import { odhTypeDetailElement } from '../../builder/tourism';

export const accommodationTypesSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [odhTypeDetailElement()],
});
