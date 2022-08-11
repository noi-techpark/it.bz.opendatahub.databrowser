import { accommodationTypesDetailView } from './accommodationTypes.detailView';
import { accommodationTypesQuickView } from './accommodationTypes.quickView';
import { accommodationTypesEditView } from './accommodationTypes.editView';
import { accommodationTypesListView } from './accommodationTypes.listView';

export const accommodationTypesViews = {
  table: accommodationTypesListView,
  detail: accommodationTypesDetailView,
  quick: accommodationTypesQuickView,
  edit: accommodationTypesEditView,
};
