import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const accommodationDetailView: DetailViewConfig = {
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
              title: 'Accommodation Type',
              component: CellComponent.StringCell,
              fields: { text: 'AccoTypeId' },
            },
            {
              title: 'Category',
              component: CellComponent.StringCell,
              fields: { text: 'AccoCategoryId' },
            },
            {
              title: 'Boardings',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'BoardIds',
              },
              params: {
                separator: ', ',
              },
            },

          ],
        },

        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Room',
              component: CellComponent.StringCell,
              fields: { text: 'HasApartment' },
              class: 'break-all',
            },
            {
              title: 'Gastronomy',
              component: CellComponent.StringCell,
              fields: { text: 'IsGastronomy' },
              class: 'break-all',
            },
            {
              title: 'Is Bookable',
              component: CellComponent.StringCell,
              fields: { text: 'IsBookable' },
              class: 'break-all',
            },
            {
              title: 'Special Features',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'SpecialFeaturesIds',
              },
              params: {
                separator: ', ',
              },
            },

            {
              title: 'Features',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'Name',
              },
              params: {
                fieldName: 'Id',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Badges',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'AccoBadges',
              },
              params: {
                separator: ', ',
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
            {
              title: 'Accommodation Type',
              component: CellComponent.StringCell,
              fields: { text: 'AccoTypeId' },
            },
            {
              title: 'Category',
              component: CellComponent.StringCell,
              fields: { text: 'AccoCategoryId' },
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
            {
              title: 'Vsst',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Vat' },
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
              title: 'Mobile Number',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Mobile' },
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
};
