// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDatasetQueryStore } from '../location/store/datasetQueryStore';
import { NavigationCallback } from './types';

export const mobilityNavigation = (): NavigationCallback => {
  const { handle } = useDatasetQueryStore();

  return {
    goToPage: (page) => {
      const offset = handle('offset');
      const limit = handle('limit');
      const limitAsNumber = Number(limit.value ?? '0');
      offset.value = ((page - 1) * limitAsNumber).toString();
    },
    changePageSize: (size) => {
      const limit = handle('limit');
      limit.value = size.toString();
    },
  };
};
