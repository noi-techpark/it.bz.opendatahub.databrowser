// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const booleanOrStringToBoolean = (
  value: boolean | string | undefined,
  defaultValue = true
): boolean => {
  if (value == undefined) {
    return defaultValue;
  }

  // If value is a boolean, return it
  if (typeof value === 'boolean') {
    return value;
  }
  // If value is a string, return the boolean value of the string
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  // Return default value
  return defaultValue;
};

export const stringToNumber = (
  value: string | null | undefined,
  defaultValue: number
): number => {
  if (value == undefined) {
    return defaultValue;
  }

  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};
