// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const ROLE_READ = ['DataReader'];
export const ROLE_CREATE = ['DataWriter', 'DataCreate'];
export const ROLE_UPDATE = ['DataWriter', 'DataModify'];
export const ROLE_DELETE = ['DataWriter', 'DataDelete'];

export const extendReadRoles = (roles: string | string[]): string[] => [
  ...ROLE_READ,
  ...toArray(roles),
];

export const extendCreateRoles = (roles: string | string[]): string[] => [
  ...ROLE_CREATE,
  ...toArray(roles),
];

export const extendUpdateRoles = (roles: string | string[]): string[] => [
  ...ROLE_UPDATE,
  ...toArray(roles),
];

export const extendDeleteRoles = (roles: string | string[]): string[] => [
  ...ROLE_DELETE,
  ...toArray(roles),
];

const toArray = (s: string | string[]) => (Array.isArray(s) ? s : [s]);
