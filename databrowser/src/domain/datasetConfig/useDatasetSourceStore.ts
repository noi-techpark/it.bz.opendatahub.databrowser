// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineStore } from 'pinia';
import { SourceType } from './source/types';

interface State {
  source: SourceType;
}

const initialState: State = {
  source: 'embedded',
};

export const useDatasetSourceStore = defineStore('datasetSourceStore', {
  state: () => initialState,
});
