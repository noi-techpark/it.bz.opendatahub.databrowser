// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type TagName = string;
export type Url = string;
export type UrlWithType = { url: Url; type?: 'module' };
export type WebComponentConfig = Url | UrlWithType;

export const isUrlWithType = (
  config: WebComponentConfig
): config is UrlWithType => !(typeof config === 'string');
