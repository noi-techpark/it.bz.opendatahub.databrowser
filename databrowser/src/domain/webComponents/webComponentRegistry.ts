// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TagName, WebComponentConfig } from './types';

/**
 * Enum of all known Web Component HTML tag names.
 */
export enum WebComponent {
  ODHActivityPoi = 'odh-activity-poi',
}

/**
 * Add your
 */
export const webComponentRegistry: Record<TagName, WebComponentConfig> = {
  [WebComponent.ODHActivityPoi]:
    'https://cdn.webcomponents.opendatahub.bz.it/dist/0e5fbede-4a21-4dd3-bf85-7d2be71dfb12/bundle.js',
};

export const isRegisteredWebComponent = (tagName: TagName) =>
  webComponentRegistry[tagName] != null;
