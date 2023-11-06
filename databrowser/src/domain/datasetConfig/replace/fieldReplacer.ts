// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type FieldsReplacer = (
  fields?: Record<string, string>
) => Record<string, string>;

export const buildFieldReplacer = (
  replacements: Record<string, string> = {}
): { replaceFields: FieldsReplacer } => {
  // Replace all placeholders in a string with the corresponding replacement
  const replaceWithParams = (s: string): string =>
    s.replace(
      /\{([^}]+)\}/g,
      (wtf, paramName) => replacements[paramName] ?? wtf
    );

  // Utility function to replace all placeholders in an object with the
  // corresponding API parameter
  const replaceFields = (fields?: Record<string, string>) => {
    return fields == null
      ? {}
      : Object.entries(fields).reduce<Record<string, string>>(
          (prev, [key, value]) => ({
            ...prev,
            [key]: replaceWithParams(value),
          }),
          {}
        );
  };

  return { replaceFields };
};
