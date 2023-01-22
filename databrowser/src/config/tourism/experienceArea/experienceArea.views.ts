import { experienceAreaListView } from './experienceArea.listView';
import { experienceAreaSharedView } from './experienceArea.sharedView';

export const experienceAreaViews = {
  table: experienceAreaListView,
  detail: experienceAreaSharedView(),
  edit: experienceAreaSharedView(),
};
