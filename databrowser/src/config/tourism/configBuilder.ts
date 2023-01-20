import { CellComponent } from '../../domain/cellComponents/types';
import { withOdhBaseUrl } from '../utils';

export const EDITED_TABLE_CONFIG = {
  title: 'Edited',
  component: CellComponent.EditedDateCell,
  class: 'w-48',
  fields: {
    date: 'LastChange',
  },
  params: {
    format: 'do MMMM yyyy',
  },
} as const;

export const EVENT_DOCUMENT_SINGLE_VIEW_CONFIG = {
  title: 'PDFs',
  component: CellComponent.EventDocumentCell,
  listFields: {
    attributeName: 'files',
    pathToParent: 'EventDocument',
    fields: {
      src: 'DocumentURL',
      language: 'Language',
    },
  },
} as const;

export const ID_READONLY_CONFIG = {
  title: 'ID',
  component: CellComponent.StringCell,
  fields: { text: 'Id' },
  params: { readonly: 'true' },
} as const;

export const GPS_DATA_TABLE_CONFIG = {
  title: 'GPS Data',
  component: CellComponent.GpsPointsCell,
  class: 'w-48',
  fields: {
    type: 'GpsPoints.position.Gpstype',
    latitude: 'GpsPoints.position.Latitude',
    longitude: 'GpsPoints.position.Longitude',
    altitude: 'GpsPoints.position.Altitude',
    altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
  },
} as const;

export const IMAGE_GALLERY_CONFIG = {
  title: '',
  component: CellComponent.EditImageGalleryCell,
  listFields: {
    attributeName: 'images',
    pathToParent: 'ImageGallery',
    fields: {
      alt: 'ImageAltText.{language}',
      src: 'ImageUrl',
      name: 'ImageName',
      width: 'Width',
      height: 'Height',
      title: 'ImageTitle.{language}',
      description: 'ImageDesc.{language}',
      copyright: 'CopyRight',
      license: 'License',
      listPosition: 'ListPosition',
      source: 'ImageSource',
      isInGallery: 'IsInGallery',
    },
  },
} as const;

export const IMAGE_TABLE_CONFIG = {
  title: 'Image',
  component: CellComponent.ImageCell,
  class: 'w-40',
  fields: {
    src: 'ImageGallery.0.ImageUrl',
  },
} as const;

export const LANGUAGE_TABLE_CONFIG = {
  title: 'Languages',
  component: CellComponent.ArrayCell,
  class: 'w-40',
  fields: {
    items: 'HasLanguage',
  },
  params: {
    separator: ', ',
  },
} as const;

export const LAST_CHANGES_CONFIG = {
  title: 'Last Changes',
  component: CellComponent.EditedDateCell,
  fields: { date: 'LastChange' },
  params: { format: 'do MMMM yyyy HH:mm' },
} as const;

export const LOGO_TABLE_CONFIG = {
  title: 'Logo',
  component: CellComponent.ImageCell,
  class: 'w-40',
  fields: {
    src: 'ContactInfos.{language}.LogoUrl',
  },
} as const;

export const LOCATION_TABLE_CONFIG = {
  title: 'Location',
  component: CellComponent.TextHighlightCell,
  class: 'w-52',
  fields: {
    title: 'LocationInfo.RegionInfo.Name.{language}',
    subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
  },
} as const;

export const ROOM_BOOKED_TABLE_CONFIG = {
  title: '',
  component: CellComponent.EditRoomBookedCell,
  listFields: {
    pathToParent: 'RoomBooked',
    fields: {
      space: 'Space',
      spaceDesc: 'SpaceDesc',
      spaceAbbrev: 'SpaceAbbrev',
      spaceType: 'SpaceType',
      subtitle: 'Subtitle',
      comment: 'Comment',
      startDate: 'StartDate',
      endDate: 'EndDate',
      startDateUTC: 'StartDateUTC',
      endDateUTC: 'EndDateUTC',
      spaceDescRoomMapping: 'SpaceDescRoomMapping',
    },
    attributeName: 'roomBooked',
  },
} as const;

export const ODH_ACTIVE_TABLE_CONFIG = {
  title: 'Open Data Hub state',
  component: CellComponent.StateCell,
  class: 'w-36',
  fields: {
    state: 'OdhActive',
  },
} as const;

export const ODH_TAG_SINGLE_VIEW_CONFIG = {
  title: 'Open Data Hub Tags',
  component: CellComponent.OdhTagCell,
  listFields: {
    attributeName: 'odhTags',
    pathToParent: 'SmgTags',
  },
  params: { url: withOdhBaseUrl('/v1/ODHTag') },
} as const;

export const SOURCE_TABLE_CONFIG = {
  title: 'Source',
  component: CellComponent.StringCell,
  class: 'w-36',
  fields: {
    text: 'Source',
  },
} as const;

export const TITLE_TABLE_CONFIG = {
  title: 'Title',
  component: CellComponent.StringCell,
  class: 'w-60',
  fields: {
    text: 'Detail.{language}.Title',
  },
} as const;

export const WEBCAM_TABLE_CONFIG = {
  title: '',
  component: CellComponent.WebcamCell,
  listFields: {
    attributeName: 'webcams',
    pathToParent: 'Webcam',
    fields: {
      name: 'Webcamname.{language}',
      imageUrl: 'Webcamurl',
      latitude: 'GpsInfo.Latitude',
      longitude: 'GpsInfo.Longitude',
      altitude: 'GpsInfo.Altitude',
      listPosition: 'ListPosition',
    },
  },
} as const;

export const odhTagConfigWithMainEntity = (mainentity: string) => ({
  ...ODH_TAG_SINGLE_VIEW_CONFIG,
  params: {
    url: `${ODH_TAG_SINGLE_VIEW_CONFIG.params.url}?mainentity=${mainentity}`,
  },
});
