// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ObjectMappings } from '../types';

export type ParamsReplacer = (s: string) => string;

export type PropertyPathReplacer = (
  objectMappings?: ObjectMappings
) => ObjectMappings;

export type PathParam = string;
export type Replacement = string;
