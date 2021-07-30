import { OdhActivityPoiDetail } from './src/odhActivityPoi/OdhActivityPoiDetail';
import { OdhActivityPoiFilter } from './src/odhActivityPoi/OdhActivityPoiFilter';
import { OdhActivityPoiList } from './src/odhActivityPoi/OdhActivityPoiList';

window.customElements.define(
  'databrowser-odh-activity-poi-detail',
  OdhActivityPoiDetail
);
window.customElements.define(
  'databrowser-odh-activity-poi-filter',
  OdhActivityPoiFilter
);
window.customElements.define(
  'databrowser-odh-activity-poi-list',
  OdhActivityPoiList
);
