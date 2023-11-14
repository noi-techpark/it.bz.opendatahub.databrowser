// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ObjectMapping } from '../types';

export type ParamsReplacer = (s: string) => string;

export type PropertyPathReplacer = (
  objectMapping?: ObjectMapping
) => ObjectMapping;

export type PathParam = string;
export type Replacement = string;
