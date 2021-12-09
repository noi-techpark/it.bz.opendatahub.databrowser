import { GenericRendererElement } from './types';

import ArrayRenderer from './ArrayRenderer.vue';
window.customElements.define(GenericRendererElement.ARRAY, ArrayRenderer);

import DateRenderer from './DateRenderer.vue';
window.customElements.define(GenericRendererElement.DATE, DateRenderer);

import EditedDateRenderer from './EditedDateRenderer.vue';
window.customElements.define(
  GenericRendererElement.EDITED_DATE,
  EditedDateRenderer
);

import ImageRenderer from './ImageRenderer.vue';
window.customElements.define(GenericRendererElement.IMAGE, ImageRenderer);

import JsonRenderer from './JsonRenderer.vue';
window.customElements.define(GenericRendererElement.JSON, JsonRenderer);

import StateRenderer from './StateRenderer.vue';
window.customElements.define(GenericRendererElement.STATE, StateRenderer);

import StringRenderer from './StringRenderer.vue';
window.customElements.define(GenericRendererElement.STRING, StringRenderer);

import TextHighlightRenderer from './TextHighlightRenderer.vue';
window.customElements.define(
  GenericRendererElement.TEXT_HIGHLIGHT,
  TextHighlightRenderer
);
