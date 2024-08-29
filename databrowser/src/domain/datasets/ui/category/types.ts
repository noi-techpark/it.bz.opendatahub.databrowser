// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PropertyConfig } from '../../config/types';

export type PropertyConfigWithErrors = PropertyConfig & {
  errors?: string[];
};

export interface SubElementCategory {
  objectPath: string;
  elements: Category;
}

export interface Category {
  name: string;
  slug: string;
  subCategories: SubCategory[];
  visible: boolean;
  subElements?: SubElementCategory[];
  isAnyPropertyRequired?: boolean;
  isAnyPropertyError?: boolean;
}

export interface SubCategory {
  name: string;
  properties: PropertyConfigWithErrors[];
}
