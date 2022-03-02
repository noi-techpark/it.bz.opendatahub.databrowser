import { CellComponent } from '../../domain/cellComponents/types';
import { ApiConfigEntry } from '../types';
import { tourismBaseUrl } from './urls';

export const odhAccommodationConfig: ApiConfigEntry = {
  description: {
    title: 'Accommodation',
    subtitle: 'This dataset contains tourism accommodations.',
    description:
      'This dataset contains various data about accommodations, mainly located in the South Tyrol region.',
  },
  listEndpoint: {
    url: `${tourismBaseUrl}/v1/Accommodation`,
    tableConfig: [
      {
        title: 'Image',
        component: CellComponent.ImageCell,
        class: 'w-40',
        fields: {
          src: 'ImageGallery.[0].ImageUrl',
        },
      },
      {
        title: 'Title',
        component: CellComponent.StringCell,
        class: 'w-48',
        fields: {
          text: 'AccoDetail.{language}.Name',
        },
      },
      {
        title: 'Location',
        component: CellComponent.TextHighlightCell,
        class: 'w-40',
        fields: {
          title: 'LocationInfo.RegionInfo.Name.{language}',
          subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
        },
      },
      {
        title: 'Languages',
        component: CellComponent.ArrayCell,
        class: 'w-40',
        fields: {
          items: 'HasLanguage',
        },
        params: {
          separator: ', ',
        },
      },
      {
        title: 'Edited',
        component: CellComponent.EditedDateCell,
        class: 'w-40',
        fields: {
          date: 'LastChange',
        },
        params: {
          format: 'dd. MMMM yyyy',
        },
      },
      {
        title: 'Source',
        component: CellComponent.StringCell,
        class: 'w-36',
        fields: {
          text: 'Source',
        },
      },
      {
        title: 'ODH state',
        component: CellComponent.StateCell,
        class: 'w-36',
        fields: {
          state: 'OdhActive',
        },
      },
    ],
  },
  detailEndpoint: {
    url: `${tourismBaseUrl}/v1/Accommodation/{id}`,
    viewConfig: [
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
    ],
  },
};
