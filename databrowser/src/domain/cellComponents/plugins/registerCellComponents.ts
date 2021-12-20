import { App } from 'vue';

import ArrayCell from '../components/arrayCell/ArrayCell.vue';
import DateCell from '../components/dateCell/DateCell.vue';
import EditedDateCell from '../components/editedDateCell/EditedDateCell.vue';
import ImageCell from '../components/imageCell/ImageCell.vue';
import JsonCell from '../components/jsonCell/JsonCell.vue';
import StateRenderer from '../components/stateRenderer/StateRenderer.vue';
import StringRenderer from '../components/stringRenderer/StringRenderer.vue';
import TextHighlightRenderer from '../components/textHighlightRenderer/TextHighlightRenderer.vue';
import { CellComponent } from '../types';

export default {
  install: (app: App) => {
    app.component(CellComponent.ArrayCell, ArrayCell);
    app.component(CellComponent.DateCell, DateCell);
    app.component(CellComponent.EditedDateCell, EditedDateCell);
    app.component(CellComponent.ImageCell, ImageCell);
    app.component(CellComponent.JsonCell, JsonCell);
    app.component(CellComponent.StateRenderer, StateRenderer);
    app.component(CellComponent.StringRenderer, StringRenderer);
    app.component(CellComponent.TextHighlightRenderer, TextHighlightRenderer);
  },
};
