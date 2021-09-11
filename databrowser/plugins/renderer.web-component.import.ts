/**
 * This plugin imports and registers the rendererer Web-Components.
 */

// Import from Web Component src to enable auto reload on changes during dev
import {
  JsonRenderer,
  StringRenderer,
} from '~/../web-components/databrowser-generic';

import { GenericRendererElement } from '~/generic-renderer/renderer.enum';

window.customElements.define(GenericRendererElement.JSON, JsonRenderer);
window.customElements.define(GenericRendererElement.STRING, StringRenderer);
