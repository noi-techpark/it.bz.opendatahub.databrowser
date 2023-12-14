// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption } from '../../../../../components/select/types';

export type RemoteOptionsMapper<T extends SelectOption = SelectOption> = (
  data: unknown[],
  keySelector: string,
  labelSelector: string
) => T[];
