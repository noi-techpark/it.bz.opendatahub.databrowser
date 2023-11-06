// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PropertyConfig } from '../../datasetConfig/types';

export type PropertyConfigWithErrors = PropertyConfig & {
  errors?: string[];
};

export interface Category {
  name: string;
  slug: string;
  subCategories: SubCategory[];
  isAnyPropertyRequired?: boolean;
  isAnyPropertyError?: boolean;
}

export interface SubCategory {
  name: string;
  properties: PropertyConfigWithErrors[];
}
