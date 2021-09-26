/**
 * This plugin imports and registers the rendererer Web-Components.
 */

// Import from Web Component src to enable auto reload on changes during dev
import {
  LinkRenderer,
  JsonRenderer,
  StringRenderer,
} from '~/../web-components/databrowser-generic';

import { GenericRendererElement } from '~/modules/generic-renderer/config/renderer.enum';

window.customElements.define(GenericRendererElement.LINK, LinkRenderer);
window.customElements.define(GenericRendererElement.JSON, JsonRenderer);
window.customElements.define(GenericRendererElement.STRING, StringRenderer);
