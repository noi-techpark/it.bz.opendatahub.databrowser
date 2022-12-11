import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const venueDetailView: DetailViewConfig = {
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
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
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
          name: 'General data',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
      ],
    },
    {
      name: 'Contact',
      slug: 'contact',
      subcategories: [
        {
          name: 'Name and Company Data',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Name' },
            },
            {
              title: 'First Name',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Firstname' },
            },
            {
              title: 'Surname',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Lastname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Street' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Zip' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.City' },
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Phone' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Website' },
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
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'Region / TVB',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
            {
              title: 'Tourismorganization',
              component: CellComponent.StringCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'Municipality',
              component: CellComponent.StringCell,
              fields: {
                text: 'LocationInfo.MunicipalityInfo.Name.{language}',
              },
            },
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
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
