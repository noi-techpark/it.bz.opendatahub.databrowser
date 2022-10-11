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
              title: 'Start date',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'End date',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'Event location',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
            },
          ],
        },
        {
          name: 'Organizer Info',
          properties: [
            {
              title: 'Company Name',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyName' },
              class: 'break-all',
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
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Event Location',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
            },
            {
              title: 'Address',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyAddressLine1' },
            },

            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyCity' },
              class: 'break-all',
            },
            {
              title: 'Country',
              component: CellComponent.StringCell,
              fields: { text: 'ContactCountry' },
              class: 'break-all',
            },
            {
              title: 'ZIP Code',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyPostalCode' },
              class: 'break-all',
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Sold out',
              component: CellComponent.StringCell,
              fields: { text: 'SoldOut' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Additional information',
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
              title: 'TechnologyFields',
              component: CellComponent.StringCell,
              fields: { text: 'TechnologyFields' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Room mananagement',
          properties: [
            {
              title: 'Date Start',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'Date End',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'TechnologyFields',
              component: CellComponent.StringCell,
              fields: { text: 'TechnologyFields' },
              class: 'break-all',
            },
            {
              title: 'Anchor venue room',
              component: CellComponent.StringCell,
              fields: { text: 'AnchorVenueRoomMapping' },
            },
            {
              title: 'Space',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'RoomBooked',
              },
              params: {
                fieldName: 'Space',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Rooms',
              component: CellComponent.TypeBasedCell,
              class: 'w-40',
              fields: {
                data: 'RoomBooked',
              },
            },
            {
              title: 'Subtitle',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'RoomBooked',
              },
              params: {
                fieldName: 'Subtitle',
                separator: ', ',
                max: '3',
              },
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
              title: 'Start date',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do/M/yyyy HH:mm',
              },
            },
            {
              title: 'End date',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
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
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.StringCell,
              fields: { text: 'Source' },
            },
          ],
        },
      ],
    },
    {
      name: 'Text information',
      slug: 'text-information',
      subcategories: [
        {
          name: 'Text information',
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
          ],
        },
      ],
    },

    {
      name: 'NOI-specific Data',
      slug: 'noi-specific-data',
      subcategories: [
        {
          name: 'Title & Description',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
              class: 'break-all',
            },
            {
              title: 'Event Description EN',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionEN' },
              class: 'break-all',
            },
            {
              title: 'Event Description DE',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionDE' },
              class: 'break-all',
            },
            {
              title: 'Event Description IT',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionIT' },
              class: 'break-all',
            },
          ],
        },
      ],
    },
    {
      name: 'Contact',
      slug: 'company',
      subcategories: [
        {
          name: 'Name and Company Data',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyName' },
            },
            {
              title: 'Company ID',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyId' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyAddressLine1' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyPostalCode' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyCity' },
            },
            {
              title: 'Country',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyCountry' },
            },
          ],
        },
        {
          name: 'Contact',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyMail' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyPhone' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.UrlCell,
              fields: { text: 'CompanyUrl' },
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
          name: 'Images',
          properties: [
            {
              title: '',
              component: CellComponent.ImageGalleryCell,
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
      name: 'GPS Data',
      slug: 'gps-data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell,
              fields: {
                type: 'GpsPoints.position.Gpstype',
                latitude: 'GpsPoints.position.Latitude',
                longitude: 'GpsPoints.position.Longitude',
                altitude: 'GpsPoints.position.Altitude',
                altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
              },
            },
          ],
        },
      ],
    },
  ],
};
