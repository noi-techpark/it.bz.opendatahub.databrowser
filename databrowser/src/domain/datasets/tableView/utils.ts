// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEventBus } from '@vueuse/core';

// Extract row id from row object.
// If the object has an Id property, then return that. Otherwise, if the object
// has an id property, then return that. If the object has neither an Id nor an
// id property, then return undefined.
export const rowId = (row: { Id?: string; id?: string }, defaultId?: string) =>
  row.Id ?? row.id ?? defaultId;

export const useEventDelete = useEventBus<string | undefined>('delete');
