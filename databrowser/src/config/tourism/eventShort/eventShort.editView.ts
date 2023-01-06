import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import {
  ID_READONLY_CONFIG,
  IMAGE_GALLERY_CONFIG,
  ROOM_BOOKED_CONFIG,
} from '../configBuilder';

export const eventShortEditView: EditViewConfig = {
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
              params: { rows: '4' },
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
              component: CellComponent.StringCell,
              fields: { text: 'WebAddress' },
              class: 'break-all',
            },
            {
              title: 'Video-URL',
              component: CellComponent.StringCell,
              fields: { text: 'VideoUrl' },
              class: 'break-all',
            },
            {
              title: 'Date start',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: { type: 'datetime' },
            },
            {
              title: 'Date end',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: { type: 'datetime' },
            },
            {
              title: 'Rooms',
              component: CellComponent.TypeBasedCell,
              fields: { data: 'RoomBooked' },
            },
            {
              title: 'Location',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
            },
            {
              title: 'Technology Fields',
              component: CellComponent.ArrayCell,
              fields: { text: 'TechnologyFields' },
            },
            {
              title: 'Tagging Fields',
              component: CellComponent.ArrayCell,
              fields: { text: 'CustomTagging' },
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
          properties: [],
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
              component: CellComponent.SelectWithOptionsCell,
              fields: { value: 'LicenseInfo.License' },
              params: {
                value_001: 'CC0',
                label_001: 'CC0',
                value_002: 'CC-BY',
                label_002: 'CC-BY',
                value_003: 'Closed',
                label_003: 'Closed',
              },
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
              fields: { text: 'LicenseInfo.ClosedData' },
            },
          ],
        },
      ],
    },
  ],
};
