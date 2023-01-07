import { App } from 'vue';

import ArrayCell from '../components/cells/arrayCell/ArrayCell.vue';
import ArrayCellTags from '../components/cells/arrayCellTags/ArrayCellTags.vue';
import ArticleLinkInfo from '../components/cells/articleLinkInfoCell/ArticleLinkInfoCell.vue';
import DateCell from '../components/cells/dateCell/DateCell.vue';
import EditedDateCell from '../components/cells/editedDateCell/EditedDateCell.vue';
import EditImageGalleryCell from '../components/cells/editImageGalleryCell/EditImageGalleryCell.vue';
import EditRoomBookedCell from '../components/cells/editRoomBookedCell/EditRoomBookedCell.vue';
import GpsPointsCell from '../components/cells/gpsPointsCell/GpsPointsCell.vue';
import HtmlCell from '../components/cells/htmlCell/HtmlCell.vue';
import InputReferenceCell from '../components/cells/inputReferenceCell/InputReferenceCell.vue';
import ImageCell from '../components/cells/imageCell/ImageCell.vue';
import ImageEditCell from '../components/cells/imageCell/ImageEditCell.vue';
import ImageGalleryCell from '../components/cells/imageGalleryCell/ImageGalleryCell.vue';
import JsonCell from '../components/cells/jsonCell/JsonCell.vue';
import SelectWithOptionsCell from '../components/cells/selectWithOptionsCell/SelectWithOptionsCell.vue';
import StateCell from '../components/cells/stateCell/StateCell.vue';
import StringCell from '../components/cells/stringCell/StringCell.vue';
import UrlCell from '../components/cells/UrlCell/UrlCell.vue';
import StringTemplateCell from '../components/cells/stringTemplateCell/StringTemplateCell.vue';
import TextAreaCell from '../components/cells/textAreaCell/TextAreaCell.vue';
import TextHighlightCell from '../components/cells/textHighlightCell/TextHighlightCell.vue';
import ToggleCell from '../components/cells/toggleCell/ToggleCell.vue';
import TypeBasedCell from '../components/cells/typeBasedCell/TypeBasedCell.vue';
import WebcamGalleryCell from '../components/cells/webcamGalleryCell/WebcamGalleryCell.vue';
import FixedValue from '../components/filters/fixedValue/FixedValue.vue';

import { CellComponent, FilterComponent } from '../types';

export default {
  install: (app: App) => {
    app.component(CellComponent.ArrayCell, ArrayCell);
    app.component(CellComponent.ArrayCellTags, ArrayCellTags);
    app.component(CellComponent.DateCell, DateCell);
    app.component(CellComponent.EditedDateCell, EditedDateCell);
    app.component(CellComponent.EditImageGalleryCell, EditImageGalleryCell);
    app.component(CellComponent.EditRoomBookedCell, EditRoomBookedCell);
    app.component(CellComponent.GpsPointsCell, GpsPointsCell);
    app.component(CellComponent.HtmlCell, HtmlCell);
    app.component(CellComponent.InputReferenceCell, InputReferenceCell);
    app.component(CellComponent.ImageCell, ImageCell);
    app.component(CellComponent.ImageEditCell, ImageEditCell);
    app.component(CellComponent.ImageGalleryCell, ImageGalleryCell);
    app.component(CellComponent.JsonCell, JsonCell);
    app.component(CellComponent.ArticleLinkInfo, ArticleLinkInfo);
    app.component(CellComponent.SelectWithOptionsCell, SelectWithOptionsCell);
    app.component(CellComponent.StateCell, StateCell);
    app.component(CellComponent.StringCell, StringCell);
    app.component(CellComponent.UrlCell, UrlCell);
    app.component(CellComponent.StringTemplateCell, StringTemplateCell);
    app.component(CellComponent.TextAreaCell, TextAreaCell);
    app.component(CellComponent.TextHighlightCell, TextHighlightCell);
    app.component(CellComponent.ToggleCell, ToggleCell);
    app.component(CellComponent.TypeBasedCell, TypeBasedCell);
    app.component(CellComponent.WebcamGalleryCell, WebcamGalleryCell);

    app.component(FilterComponent.FixedValue, FixedValue);
  },
};
