// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref } from 'vue';

export const scrollToTop = (ref: Ref<HTMLElement | null>) => {
  const element = ref.value;
  if (element != null) {
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};
