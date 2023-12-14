// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Extract row id from row object.
// If the object has an Id property, then return that. Otherwise, if the object
// has an id property, then return that. If the object has neither an Id nor an
// id property, then return undefined.
export const rowId = (row: { Id?: string; id?: string }, defaultId?: string) =>
  row.Id ?? row.id ?? defaultId;

export const firstField = (fields?: Record<string, string>) => {
  const values = Object.values(fields ?? {});
  return values.length === 1 ? values[0] : undefined;
};
