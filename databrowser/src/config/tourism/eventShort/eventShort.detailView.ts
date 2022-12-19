import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailViewConfig } from '../../../domain/datasetConfig/types';

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
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Event description',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescription' },
            },
            {
              title: 'Organizer Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactFirstName' },
            },
            {
              title: 'Organizer Surname',
              component: CellComponent.StringCell,
              fields: { text: 'ContactLastName' },
            },
            {
              title: 'External Organizer',
              component: CellComponent.StringCell,
              fields: { text: 'ExternalOrganizer' },
              class: 'break-all',
            },
            {
              title: 'Sold out',
              component: CellComponent.StringCell,
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
              component: CellComponent.StringCell,
              fields: { text: 'ActiveWeb' },
              class: 'break-all',
            },
            {
              title: 'Active on Community App',
              component: CellComponent.StringCell,
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
              component: CellComponent.UrlCell,
              fields: { text: 'CompanyUrl' },
            },
            {
              title: 'Video-URL',
              component: CellComponent.UrlCell,
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
              component: CellComponent.DateCell,
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
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'HH:mm',
              },
            },
            {
              title: 'Room Name',
              component: CellComponent.StringCell,
              fields: { text: 'AnchorVenueRoomMapping' },
            },

            {
              title: 'Location',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
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
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.ClosedData' },
            },
          ],
        },
      ],
    },
  ],
};
