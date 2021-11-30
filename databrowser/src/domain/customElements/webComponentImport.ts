import { GenericRendererElement } from './types';

import JsonRenderer from './JsonRenderer.vue';
window.customElements.define(GenericRendererElement.JSON, JsonRenderer);

import StringRenderer from './StringRenderer.vue';
window.customElements.define(GenericRendererElement.STRING, StringRenderer);
