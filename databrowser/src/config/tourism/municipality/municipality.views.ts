import { municipalityDetailView } from './municipality.detailView';
import { municipalityEditView } from './municipality.editView';
import { municipalityListView } from './municipality.listView';
import { municipalityQuickView } from './municipality.quickView';

export const municipalityViews = {
  table: municipalityListView,
  detail: municipalityDetailView,
  quick: municipalityQuickView,
  edit: municipalityEditView,
};
