import { odhActivityPoiTypesDetailView } from './odhActivityPoiTypes.detailView';
import { odhActivityPoiTypesQuickView } from './odhActivityPoiTypes.quickView';
import { odhActivityPoiTypesEditView } from './odhActivityPoiTypes.editView';
import { odhActivityPoiTypesListView } from './odhActivityPoiTypes.listView';

export const odhActivityPoiTypesViews = {
  table: odhActivityPoiTypesListView,
  detail: odhActivityPoiTypesDetailView,
  quick: odhActivityPoiTypesQuickView,
  edit: odhActivityPoiTypesEditView,
};
