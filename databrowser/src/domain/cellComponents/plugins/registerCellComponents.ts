import { App } from 'vue';

import ArrayCell from '../components/cells/arrayCell/ArrayCell.vue';
import DateCell from '../components/cells/dateCell/DateCell.vue';
import EditedDateCell from '../components/cells/editedDateCell/EditedDateCell.vue';
import GpsListCell from '../components/cells/gpsListCell/GpsListCell.vue';
import HtmlCell from '../components/cells/htmlCell/HtmlCell.vue';
import InputReferenceCell from '../components/cells/inputReferenceCell/InputReferenceCell.vue';
import InputSingleLineCell from '../components/cells/inputSingleLineCell/InputSingleLineCell.vue';
import ImageCell from '../components/cells/imageCell/ImageCell.vue';
import ImageGalleryCell from '../components/cells/imageGalleryCell/ImageGalleryCell.vue';
import JsonCell from '../components/cells/jsonCell/JsonCell.vue';
import StateCell from '../components/cells/stateCell/StateCell.vue';
import StringCell from '../components/cells/stringCell/StringCell.vue';
import StringTemplateCell from '../components/cells/stringTemplateCell/StringTemplateCell.vue';
import TextHighlightCell from '../components/cells/textHighlightCell/TextHighlightCell.vue';
import ToggleCell from '../components/cells/toggleCell/ToggleCell.vue';
import TypeBasedCell from '../components/cells/typeBasedCell/TypeBasedCell.vue';
import WebcamGalleryCell from '../components/cells/webcamGalleryCell/WebcamGalleryCell.vue';
import FixedValue from '../components/filters/fixedValue/FixedValue.vue';
import { CellComponent, FilterComponent } from '../types';

export default {
  install: (app: App) => {
    app.component(CellComponent.ArrayCell, ArrayCell);
    app.component(CellComponent.DateCell, DateCell);
    app.component(CellComponent.EditedDateCell, EditedDateCell);
    app.component(CellComponent.GpsListCell, GpsListCell);
    app.component(CellComponent.HtmlCell, HtmlCell);
    app.component(CellComponent.InputReferenceCell, InputReferenceCell);
    app.component(CellComponent.InputSingleLineCell, InputSingleLineCell);
    app.component(CellComponent.ImageCell, ImageCell);
    app.component(CellComponent.ImageGalleryCell, ImageGalleryCell);
    app.component(CellComponent.JsonCell, JsonCell);
    app.component(CellComponent.StateCell, StateCell);
    app.component(CellComponent.StringCell, StringCell);
    app.component(CellComponent.StringTemplateCell, StringTemplateCell);
    app.component(CellComponent.TextHighlightCell, TextHighlightCell);
    app.component(CellComponent.ToggleCell, ToggleCell);
    app.component(CellComponent.TypeBasedCell, TypeBasedCell);
    app.component(CellComponent.WebcamGalleryCell, WebcamGalleryCell);

    app.component(FilterComponent.FixedValue, FixedValue);
  },
};
