// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed } from 'vue';

// Check if the given string is a valid FQDN URL using the URL constructor
export const isValidFqdnUrl = (s?: string) => {
  if (s == null) {
    return false;
  }
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export const useUrlCheck = (url: Ref<string | undefined>) => {
  const isValidFqdn = computed(() => isValidFqdnUrl(url.value));
  return { isValidFqdn };
};
