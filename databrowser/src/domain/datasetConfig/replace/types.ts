// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type StringReplacer = (s: string) => string;

export type ObjectValueReplacer = (
  object?: Record<string, string>
) => Record<string, string>;
