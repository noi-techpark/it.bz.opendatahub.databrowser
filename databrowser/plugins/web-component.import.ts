/**
 * This plugin imports and registers the Web-Components.
 */

// Import from Web Component src to enable auto reload on changes during dev
import { DatabrowserExample } from '~/../web-components/databrowser-example/src/DatabrowserExample';
import {
  OdhActivityPoiDetail,
  OdhActivityPoiFilter,
  OdhActivityPoiList,
} from '~/../web-components/databrowser-tourism';

window.customElements.define('databrowser-example', DatabrowserExample);
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
