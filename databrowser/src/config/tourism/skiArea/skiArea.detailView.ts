import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const skiAreaDetailView: DetailViewConfig = {
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
          name: 'Slope information',
          properties: [
            {
              title: 'Total slope Km',
              component: CellComponent.StringCell,
              fields: { text: 'TotalSlopeKm' },
            },
            {
              title: 'Slope Km Blue',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmBlue' },
            },
            {
              title: 'Slope Km Black',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmBlack' },
            },
            {
              title: 'Slope Km Red',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmRed' },
            },
          ],
        },
        {
          name: 'Altimeters',
          properties: [
            {
              title: 'Altimeters From',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeFrom' },
            },
            {
              title: 'Altimeters To',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeTo' },
            },
          ],
        },
        {
          name: 'Ski map',
          properties: [
            {
              title: 'Ski map',
              component: CellComponent.ImageCell,
              fields: {
                src: 'SkiAreaMapURL',
              },
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
              title: 'Active on ODH',
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
              title: 'SkiArea / TVB',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Name.{language}' },
            },
            {
              title: 'Tourismorganization',
              component: CellComponent.StringCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'skiArea',
              component: CellComponent.StringCell,
              fields: {
                text: 'LocationInfo.skiAreaInfo.Name.{language}',
              },
            },
            {
              title: 'SkiArea',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
  ],
};
