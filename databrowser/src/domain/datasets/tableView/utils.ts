// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Extract row id from raw object.
 * If the object has an Id property, then return that. Otherwise, if the object
 * has an id property, then return that. If the object has neither an Id nor an
 * id property, then return undefined.
 *
 * @param row The raw object.
 * @param defaultId The default id to return if no id is found.
 * @returns The id of the row.
 */
export const rowId = (row: { Id?: string; id?: string }, defaultId?: string) =>
  row.Id ?? row.id ?? defaultId;
