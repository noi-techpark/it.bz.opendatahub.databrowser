import { municipalityDetailView } from './municipality.detailView';
import { municipalityEditView } from './municipality.editView';
import { municipalityListView } from './municipality.listView';

export const municipalityViews = {
  table: municipalityListView,
  detail: municipalityDetailView,
  edit: municipalityEditView,
};
