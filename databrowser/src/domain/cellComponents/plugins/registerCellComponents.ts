import { App } from 'vue';

import ArrayCell from '../components/arrayCell/ArrayCell.vue';
import DateRenderer from '../components/dateRenderer/DateRenderer.vue';
import EditedDateRenderer from '../components/editedDateRenderer/EditedDateRenderer.vue';
import ImageRenderer from '../components/imageRenderer/ImageRenderer.vue';
import JsonRenderer from '../components/jsonRenderer/JsonRenderer.vue';
import StateRenderer from '../components/stateRenderer/StateRenderer.vue';
import StringRenderer from '../components/stringRenderer/StringRenderer.vue';
import TextHighlightRenderer from '../components/textHighlightRenderer/TextHighlightRenderer.vue';
import { CellComponent } from '../types';

export default {
  install: (app: App) => {
    app.component(CellComponent.ArrayCell, ArrayCell);
    app.component(CellComponent.DateRenderer, DateRenderer);
    app.component(CellComponent.EditedDateRenderer, EditedDateRenderer);
    app.component(CellComponent.ImageRenderer, ImageRenderer);
    app.component(CellComponent.JsonRenderer, JsonRenderer);
    app.component(CellComponent.StateRenderer, StateRenderer);
    app.component(CellComponent.StringRenderer, StringRenderer);
    app.component(CellComponent.TextHighlightRenderer, TextHighlightRenderer);
  },
};
