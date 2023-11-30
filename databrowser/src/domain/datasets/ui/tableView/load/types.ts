// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RecordId } from '../../../../data/types';

export interface RecordValues {
  recordId: RecordId;
  values: Record<string, unknown>[];
}
