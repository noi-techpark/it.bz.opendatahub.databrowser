// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { StringReplacer } from '../../view/types';

// Builder function to create a function that replaces all (dynamic) params
// in a string with the corresponding replacement. The parts to be replaced
// are denoted by curly braces, e.g. "person.{language}.name".
// For example, a string "person.{language}.name" with the replacement {language: 'de'}
// will be replaced with "person.de.name".
export const buildStringReplacer =
  (replacements: Record<string, string> = {}): StringReplacer =>
  (s) =>
    s.replace(
      /\{([^}]+)\}/g,
      (wtf, paramName) => replacements[paramName] ?? wtf
    );

export const useStringReplacer = (
  replacements: MaybeRef<Record<string, string> | undefined>
) => computed(() => buildStringReplacer(toValue(replacements)));
