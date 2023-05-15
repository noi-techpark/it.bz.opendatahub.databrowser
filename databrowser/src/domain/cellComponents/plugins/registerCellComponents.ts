import { App } from 'vue';

import ArrayCell from '../components/cells/arrayCell/ArrayCell.vue';
import ArrayEditableCell from '../components/cells/arrayCell/ArrayEditableCell.vue';
import ArrayLookupCell from '../components/cells/arrayLookupCell/ArrayLookupCell.vue';
import ArrayTagsCell from '../components/cells/arrayTagsCell/ArrayTagsCell.vue';
import ArticleAdditionalInfoCell from '../components/cells/articleAdditionalInfoCell/ArticleAdditionalInfoCell.vue';
import ArticleLinkInfoCell from '../components/cells/articleLinkInfoCell/ArticleLinkInfoCell.vue';
import ArticleTypeCell from '../components/cells/articleTypeCell/ArticleTypeCell.vue';
import DateCell from '../components/cells/dateCell/DateCell.vue';
import EditedDateCell from '../components/cells/editedDateCell/EditedDateCell.vue';
import EditImageGalleryCell from '../components/cells/editImageGalleryCell/EditImageGalleryCell.vue';
import EditRoomBookedCell from '../components/cells/editRoomBookedCell/EditRoomBookedCell.vue';
import EditRoomVenueCell from '../components/cells/editRoomVenueCell/EditRoomVenueCell.vue';
import EventDocumentCell from '../components/cells/eventDocumentCell/EventDocumentCell.vue';
import GpsPointsCell from '../components/cells/gpsPointsCell/GpsPointsCell.vue';
import HtmlCell from '../components/cells/htmlCell/HtmlCell.vue';
import InputReferenceCell from '../components/cells/inputReferenceCell/InputReferenceCell.vue';
import ImageCell from '../components/cells/imageCell/ImageCell.vue';
import ImageEditCell from '../components/cells/imageCell/ImageEditCell.vue';
import ImageGalleryCell from '../components/cells/imageGalleryCell/ImageGalleryCell.vue';
import OperationScheduleCell from '../components/cells/operationScheduleCell/OperationScheduleCell.vue';
import JsonCell from '../components/cells/jsonCell/JsonCell.vue';
import LoadingCell from '../components/cells/loadingCell/LoadingCell.vue';
import SelectWithOptionsCell from '../components/cells/selectWithOptionsCell/SelectWithOptionsCell.vue';
import StateCell from '../components/cells/stateCell/StateCell.vue';
import StringCell from '../components/cells/stringCell/StringCell.vue';
import UrlCell from '../components/cells/UrlCell/UrlCell.vue';
import StringTemplateCell from '../components/cells/stringTemplateCell/StringTemplateCell.vue';
import TagCell from '../components/cells/tagCell/TagCell.vue';
import TagReferenceCell from '../components/cells/tagReferenceCell/TagReferenceCell.vue';
import TextAreaCell from '../components/cells/textAreaCell/TextAreaCell.vue';
import TextHighlightCell from '../components/cells/textHighlightCell/TextHighlightCell.vue';
import ToggleButtonCell from '../components/cells/toggleCell/ToggleButtonCell.vue';
import ToggleCell from '../components/cells/toggleCell/ToggleCell.vue';
import TypeBasedCell from '../components/cells/typeBasedCell/TypeBasedCell.vue';
import WebcamCell from '../components/cells/webcamCell/WebcamCell.vue';
import FixedValue from '../components/filters/fixedValue/FixedValue.vue';

// NOTE: this components do not belong to table components; it's advised to refactor this table in the future.
import QuickViewTextInfoCard from '../../../components/quickview/QuickViewTextInfoCard.vue';
import QuickViewContactsCard from '../../../components/quickview/QuickViewContactsCard.vue';
import QuickViewWebcamsView from '../../../components/quickview/QuickViewWebcamsView.vue';
import QuickViewMapView from '../../../components/quickview/QuickViewMapView.vue';
import QuickViewOpeningHoursView from '../../../components/quickview/QuickViewOpeningHoursView.vue';
import QuickViewRecordInfoView from '../../../components/quickview/QuickViewRecordInfoView.vue';

import { CellComponent, FilterComponent } from '../types';

export default {
  install: (app: App) => {
    app.component(CellComponent.ArrayCell, ArrayCell);
    app.component(CellComponent.ArrayEditableCell, ArrayEditableCell);
    app.component(CellComponent.ArrayLookupCell, ArrayLookupCell);
    app.component(CellComponent.ArrayTagsCell, ArrayTagsCell);
    app.component(
      CellComponent.ArticleAdditionalInfoCell,
      ArticleAdditionalInfoCell
    );
    app.component(CellComponent.ArticleLinkInfoCell, ArticleLinkInfoCell);
    app.component(CellComponent.ArticleTypeCell, ArticleTypeCell);
    app.component(CellComponent.DateCell, DateCell);
    app.component(CellComponent.EditedDateCell, EditedDateCell);
    app.component(CellComponent.EditImageGalleryCell, EditImageGalleryCell);
    app.component(CellComponent.EditRoomBookedCell, EditRoomBookedCell);
    app.component(CellComponent.EditRoomVenueCell, EditRoomVenueCell);
    app.component(CellComponent.EventDocumentCell, EventDocumentCell);
    app.component(CellComponent.GpsPointsCell, GpsPointsCell);
    app.component(CellComponent.HtmlCell, HtmlCell);
    app.component(CellComponent.InputReferenceCell, InputReferenceCell);
    app.component(CellComponent.ImageCell, ImageCell);
    app.component(CellComponent.ImageEditCell, ImageEditCell);
    app.component(CellComponent.ImageGalleryCell, ImageGalleryCell);
    app.component(CellComponent.JsonCell, JsonCell);
    app.component(CellComponent.LoadingCell, LoadingCell);
    app.component(CellComponent.OperationScheduleCell, OperationScheduleCell);
    app.component(CellComponent.SelectWithOptionsCell, SelectWithOptionsCell);
    app.component(CellComponent.StateCell, StateCell);
    app.component(CellComponent.StringCell, StringCell);
    app.component(CellComponent.UrlCell, UrlCell);
    app.component(CellComponent.StringTemplateCell, StringTemplateCell);
    app.component(CellComponent.TagCell, TagCell);
    app.component(CellComponent.TagReferenceCell, TagReferenceCell);
    app.component(CellComponent.TextAreaCell, TextAreaCell);
    app.component(CellComponent.TextHighlightCell, TextHighlightCell);
    app.component(CellComponent.ToggleButtonCell, ToggleButtonCell);
    app.component(CellComponent.ToggleCell, ToggleCell);
    app.component(CellComponent.TypeBasedCell, TypeBasedCell);
    app.component(CellComponent.WebcamCell, WebcamCell);

    app.component(CellComponent.QuickViewTextInfoCard, QuickViewTextInfoCard);
    app.component(CellComponent.QuickViewContactsCard, QuickViewContactsCard);
    app.component(CellComponent.QuickViewWebcamsView, QuickViewWebcamsView);
    app.component(CellComponent.QuickViewMapView, QuickViewMapView);
    app.component(
      CellComponent.QuickViewOpeningHoursView,
      QuickViewOpeningHoursView
    );
    app.component(
      CellComponent.QuickViewRecordInfoView,
      QuickViewRecordInfoView
    );

    app.component(FilterComponent.FixedValue, FixedValue);
  },
};
