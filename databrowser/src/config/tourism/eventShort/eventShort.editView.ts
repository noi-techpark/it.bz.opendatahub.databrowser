import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';

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
              title: 'Shortname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Event description',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'EventDescription' },
            },
            {
              title: 'Organizer Name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactFirstName' },
            },
            {
              title: 'Organizer Surname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactLastName' },
            },
            {
              title: 'External Organizer',
              component: CellComponent.ToggleCell,
              fields: { text: 'ExternalOrganizer' },
              class: 'break-all',
            },
            {
              title: 'Sold out',
              component: CellComponent.ToggleCell,
              fields: { text: 'SoldOut' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'Event ID',
              component: CellComponent.StringCell,
              fields: { text: 'EventId' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: 'LastChange' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Web',
              component: CellComponent.ToggleCell,
              fields: { text: 'ActiveWeb' },
              class: 'break-all',
            },
            {
              title: 'Active on Community App',
              component: CellComponent.ToggleCell,
              fields: { text: 'ActiveCommunityApp' },
              class: 'break-all',
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
          name: 'General Event data',
          properties: [
            {
              title: 'Web-URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'CompanyUrl' },
            },
            {
              title: 'Video-URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'VideoUrl' },
              class: 'break-all',
            },
            {
              title: 'Date start',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do/M/yyyy',
              },
            },
            {
              title: 'Start Time',
              component: CellComponent.InputSingleLineCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'HH:mm',
              },
            },
            {
              title: 'Date end',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do/M/yyyy',
              },
            },
            {
              title: 'End Time',
              component: CellComponent.InputSingleLineCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'HH:mm',
              },
            },
            {
              title: 'Room Name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AnchorVenueRoomMapping' },
            },

            {
              title: 'Location',
              component: CellComponent.SelectWithOptionsCell,
              fields: { text: 'EventLocation' },
              params: {
                value_001: 'NOI',
                label_001: 'NOI',
                value_002: 'EC',
                label_002: 'EC',
              },
            },
            {
              title: 'Technology Field',
              component: CellComponent.StringCell,
              fields: { text: 'TechnologyFields' },
              class: 'break-all',
            },
            {
              title: 'Tagging Field',
              component: CellComponent.StringCell,
              fields: { text: 'CustomTagging' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Room management',
          properties: [
            {
              title: '',
              component: CellComponent.TypeBasedCell,
              class: 'w-40',
              fields: {
                data: 'RoomBooked',
              },
            },
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
          properties: [
            {
              title: '',
              component: CellComponent.EditImageGalleryCell,
              fields: {
                images: 'ImageGallery',
              },
              params: {
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
                active: '',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Licenses',
      slug: 'license',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'License',
              component: CellComponent.SelectWithOptionsCell,
              fields: { text: 'LicenseInfo.License' },
              params: {
                value_001: 'CC0',
                label_001: 'CC0',
              },
            },
            {
              title: 'Author',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LicenseInfo.Author' },
            },

            {
              title: 'License Holder',
              component: CellComponent.InputSingleLineCell,
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
