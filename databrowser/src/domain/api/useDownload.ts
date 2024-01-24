// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { axiosWithMaybeAuth } from './apiAuth';

export const useDownload = () => {
  return {
    download: async (url: string) => {
      const axios = await axiosWithMaybeAuth(true);
      const response = await axios.get(url);

      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dataset.json';
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    },
  };
};
