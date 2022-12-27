import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { IMAGE_GALLERY_CONFIG, ROOM_BOOKED_CONFIG } from '../configBuilder';

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
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
              tooltip: 'This is the shortname for your event',
            },
            {
              title: 'Start date',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do MMM yyyy HH:mm',
              },
            },
            {
              title: 'End date',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do MMM yyyy HH:mm',
              },
            },
            {
              title: 'Event location',
              component: CellComponent.SelectWithOptionsCell,
              fields: { value: 'EventLocation' },
              params: {
                value_001: 'NOI',
                label_001: 'NOI Techpark',
                value_002: 'EC',
                label_002: 'Eurac',
                value_003: 'VV',
                label_003: 'Virtual Village',
                value_004: 'OUT',
                label_004: 'Other Location',
              },
              required: true,
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
              title: 'Country Abbreviation',
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
              title: 'Start date',
              component: CellComponent.DateCell,
              fields: { date: 'StartDate' },
              params: {
                format: 'do MMM yyyy HH:mm',
              },
            },
            {
              title: 'End date',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do MMM yyyy HH:mm',
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
                format: 'do MMM yyyy HH:mm',
              },
            },
            {
              title: 'End date',
              component: CellComponent.DateCell,
              fields: { date: 'EndDate' },
              params: {
                format: 'do MMM yyyy HH:mm',
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
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.SelectWithOptionsCell,
              fields: { value: 'Source' },
              params: {
                value_001: 'Content',
                label_001: 'Content',
                value_002: 'EBMS',
                label_002: 'EBMS',
              },
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
          properties: [ROOM_BOOKED_CONFIG],
        },
      ],
    },
    {
      name: 'Text information',
      slug: 'text-information',
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
              tooltip: 'Default event description',
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
              title: 'Event description DE',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionDE' },
              tooltip: 'Event description in German',
            },
            {
              title: 'Event description IT',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionIT' },
              tooltip: 'Event description in Italian',
            },
            {
              title: 'Event description EN',
              component: CellComponent.StringCell,
              fields: { text: 'EventDescriptionEN' },
              tooltip: 'Event description in English',
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
          name: 'Contact Details',
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
              component: CellComponent.StringCell,
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
          name: '',
          properties: [IMAGE_GALLERY_CONFIG],
        },
      ],
    },
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'Eventlocation',
              component: CellComponent.StringCell,
              fields: { text: 'EventLocation' },
            },
          ],
        },
        {
          name: 'Rooms',
          properties: [
            {
              title: 'Anchor venue room',
              component: CellComponent.StringCell,
              fields: { text: 'AnchorVenueRoomMapping' },
            },
            {
              title: 'Rooms booked',
              component: CellComponent.TypeBasedCell,
              fields: { data: 'RoomBooked' },
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
