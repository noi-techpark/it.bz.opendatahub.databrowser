import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import {
  EVENT_DOCUMENT_SINGLE_VIEW_CONFIG,
  ID_READONLY_CONFIG,
  IMAGE_GALLERY_CONFIG,
  ROOM_BOOKED_CONFIG,
} from '../configBuilder';

export const eventShortDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'EventTitle.{language}' },
            },
            {
              title: 'Description',
              component: CellComponent.TextAreaCell,
              fields: { text: 'EventText.{language}' },
            },
            {
              title: 'Organizer',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyName' },
            },
            {
              title: 'External organizer',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ExternalOrganizer' },
            },
            {
              title: 'Sold out',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SoldOut' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [ID_READONLY_CONFIG],
        },
        {
          name: 'Data states',
          properties: [
            // TODO: check which field to use
            {
              title: 'Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'noi.bz.it Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ActiveWeb' },
            },
            {
              title: 'NOI Community App Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'ActiveCommunityApp' },
            },
          ],
        },
      ],
    },
    {
      name: 'Event details',
      slug: 'event-details',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Web-URL',
              component: CellComponent.UrlCell,
              fields: { text: 'WebAddress' },
              class: 'break-all',
            },
            {
              title: 'Video-URL',
              component: CellComponent.UrlCell,
              fields: { text: 'VideoUrl' },
              class: 'break-all',
            },
            {
              title: 'Date start',
              component: CellComponent.EditedDateCell,
              fields: { date: 'StartDate' },
              params: { format: 'do MMMM yyyy HH:mm' },
            },
            {
              title: 'Date end',
              component: CellComponent.EditedDateCell,
              fields: { date: 'EndDate' },
              params: { format: 'do MMMM yyyy HH:mm' },
            },
            {
              title: 'Room name',
              component: CellComponent.StringCell,
              fields: { text: 'AnchorVenue' },
            },
            {
              title: 'Location',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
            },
            {
              title: 'Technology Fields',
              component: CellComponent.TagCell,
              fields: { items: 'TechnologyFields' },
            },
            {
              title: 'Tagging Fields',
              component: CellComponent.TagCell,
              fields: { items: 'CustomTagging' },
            },
            { ...ROOM_BOOKED_CONFIG, title: 'Room management' },
          ],
        },
      ],
    },
    {
      name: 'Images',
      slug: 'images',
      subcategories: [
        {
          name: '',
          properties: [IMAGE_GALLERY_CONFIG],
        },
      ],
    },
    {
      name: 'Files',
      slug: 'files',
      subcategories: [
        {
          name: '',
          properties: [EVENT_DOCUMENT_SINGLE_VIEW_CONFIG],
        },
      ],
    },
    {
      name: 'License',
      slug: 'license',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'License',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.License' },
            },
            {
              title: 'Author',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.Author' },
            },
            {
              title: 'License Holder',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.LicenseHolder' },
            },
            {
              title: 'Closed Data',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'LicenseInfo.ClosedData' },
            },
          ],
        },
      ],
    },
  ],
};
