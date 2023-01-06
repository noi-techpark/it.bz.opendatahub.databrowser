import { CellComponent } from '../../domain/cellComponents/types';

export const ID_READONLY_CONFIG = {
  title: 'ID',
  component: CellComponent.StringCell,
  fields: { text: 'Id' },
  params: { readonly: 'true' },
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

export const LAST_CHANGES_CONFIG = {
  title: 'Last Changes',
  component: CellComponent.EditedDateCell,
  fields: { date: 'LastChange' },
  params: { format: 'do MMMM yyyy HH:mm' },
} as const;

export const ROOM_BOOKED_CONFIG = {
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
