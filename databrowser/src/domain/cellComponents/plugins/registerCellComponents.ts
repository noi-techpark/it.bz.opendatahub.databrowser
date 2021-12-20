import { App } from 'vue';

import ArrayRenderer from '../components/arrayRenderer/ArrayRenderer.vue';
import DateRenderer from '../components/dateRenderer/DateRenderer.vue';
import EditedDateRenderer from '../components/editedDateRenderer/EditedDateRenderer.vue';
import ImageRenderer from '../components/imageRenderer/ImageRenderer.vue';
import JsonRenderer from '../components/jsonRenderer/JsonRenderer.vue';
import StateRenderer from '../components/stateRenderer/StateRenderer.vue';
import StringRenderer from '../components/stringRenderer/StringRenderer.vue';
import TextHighlightRenderer from '../components/textHighlightRenderer/TextHighlightRenderer.vue';
import { ComponentRenderer } from '../types';

export default {
  install: (app: App) => {
    app.component(ComponentRenderer.ArrayRenderer, ArrayRenderer);
    app.component(ComponentRenderer.DateRenderer, DateRenderer);
    app.component(ComponentRenderer.EditedDateRenderer, EditedDateRenderer);
    app.component(ComponentRenderer.ImageRenderer, ImageRenderer);
    app.component(ComponentRenderer.JsonRenderer, JsonRenderer);
    app.component(ComponentRenderer.StateRenderer, StateRenderer);
    app.component(ComponentRenderer.StringRenderer, StringRenderer);
    app.component(
      ComponentRenderer.TextHighlightRenderer,
      TextHighlightRenderer
    );
  },
};
