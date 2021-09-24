import { LinkRenderer } from './src/renderer/LinkRenderer';
import { JsonRenderer } from './src/renderer/JsonRenderer';
import { StringRenderer } from './src/renderer/StringRenderer';

window.customElements.define('databrowser-render-link', LinkRenderer);
window.customElements.define('databrowser-render-json', JsonRenderer);
window.customElements.define('databrowser-render-string', StringRenderer);
