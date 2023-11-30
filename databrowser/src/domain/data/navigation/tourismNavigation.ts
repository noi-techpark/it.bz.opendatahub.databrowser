// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDatasetQueryStore } from '../../datasets/location/store/datasetQueryStore';
import { NavigationCallback } from './types';

export const tourismNavigation = (): NavigationCallback => {
  const { handle } = useDatasetQueryStore();

  return {
    goToPage: (page) => {
      const pagenumber = handle('pagenumber');
      pagenumber.value = page.toString();
    },
    changePageSize: (size) => {
      const pagesize = handle('pagesize');
      pagesize.value = size.toString();
    },
  };
};
