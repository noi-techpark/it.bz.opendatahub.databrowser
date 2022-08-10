import { gastronomyDetailView } from './gastronomy.detailView';
import { gastronomyEditView } from './gastronomy.editView';
import { gastronomyListView } from './gastronomy.listView';
import { gastronomyQuickView } from './gastronomy.quickView';

export const gastronomyViews = {
  table: gastronomyListView,
  detail: gastronomyDetailView,
  quick: gastronomyQuickView,
  edit: gastronomyEditView,
};
