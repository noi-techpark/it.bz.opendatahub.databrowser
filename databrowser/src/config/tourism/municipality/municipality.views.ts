import { municipalityListView } from './municipality.listView';
import { municipalitySharedView } from './municipality.sharedView';

export const municipalityViews = {
  table: municipalityListView,
  detail: municipalitySharedView(),
  edit: municipalitySharedView(),
};
