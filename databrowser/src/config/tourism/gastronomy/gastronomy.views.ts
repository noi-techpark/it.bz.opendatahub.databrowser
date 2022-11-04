import { gastronomyDetailView } from './gastronomy.detailView';
import { gastronomyEditView } from './gastronomy.editView';
import { gastronomyListView } from './gastronomy.listView';

export const gastronomyViews = {
  table: gastronomyListView,
  detail: gastronomyDetailView,
  edit: gastronomyEditView,
};
