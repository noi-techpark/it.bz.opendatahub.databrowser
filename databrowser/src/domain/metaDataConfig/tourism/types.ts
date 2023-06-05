// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface TourismMetaData {
  id: string;
  shortname: string;
  description?: string;
  output: string;
  swaggerUrl?: string;
  access: 'opendata' | 'limited' | 'closed' | 'unknown';
  pathParam: string[];
  externalLink?: string;
  sources: string[];
  lastUpdated?: Date;
  apiFilter: Record<string, string>;
  recordCount: { open?: number; closed?: number; reduced?: number };
  deprecated?: boolean;
  parent?: TourismMetaData;
}
