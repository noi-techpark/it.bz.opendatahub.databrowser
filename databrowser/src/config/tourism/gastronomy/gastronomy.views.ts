import { gastronomyListView } from './gastronomy.listView';
import { gastronomySharedView } from './gastronomy.sharedView';

export const gastronomyViews = {
  table: gastronomyListView,
  detail: gastronomySharedView(),
  edit: gastronomySharedView(),
  new: gastronomySharedView(),
};
