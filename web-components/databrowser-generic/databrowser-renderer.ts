import { StringRenderer } from './src/renderer/StringRenderer';
import { JsonRenderer } from './src/renderer/JsonRenderer';

window.customElements.define('databrowser-render-json', JsonRenderer);
window.customElements.define('databrowser-render-string', StringRenderer);
