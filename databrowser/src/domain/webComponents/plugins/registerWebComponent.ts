import { GenericRendererElement } from '../types';
import ArrayRenderer from '../components/ArrayRenderer.vue';
import DateRenderer from '../components/DateRenderer.vue';
import EditedDateRenderer from '../components/EditedDateRenderer.vue';
import ImageRenderer from '../components/ImageRenderer.vue';
import JsonRenderer from '../components/JsonRenderer.vue';
import StateRenderer from '../components/StateRenderer.vue';
import StringRenderer from '../components/StringRenderer.vue';
import TextHighlightRenderer from '../components/TextHighlightRenderer.vue';

export default {
  install: () => {
    window.customElements.define(GenericRendererElement.ARRAY, ArrayRenderer);
    window.customElements.define(GenericRendererElement.DATE, DateRenderer);
    window.customElements.define(
      GenericRendererElement.EDITED_DATE,
      EditedDateRenderer
    );
    window.customElements.define(GenericRendererElement.IMAGE, ImageRenderer);
    window.customElements.define(GenericRendererElement.JSON, JsonRenderer);
    window.customElements.define(GenericRendererElement.STATE, StateRenderer);
    window.customElements.define(GenericRendererElement.STRING, StringRenderer);
    window.customElements.define(
      GenericRendererElement.TEXT_HIGHLIGHT,
      TextHighlightRenderer
    );
  },
};
