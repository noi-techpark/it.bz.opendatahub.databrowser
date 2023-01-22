import { wineAwardListView } from './wineAward.listView';
import { wineAwardSharedView } from './wineAward.sharedView';

export const wineAwardViews = {
  table: wineAwardListView,
  detail: wineAwardSharedView(),
  edit: wineAwardSharedView(),
};
