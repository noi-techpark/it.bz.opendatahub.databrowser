import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const skiRegionEditView: EditViewConfig = {
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
              title: 'Ski region name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'SkiRegionName.{language}' },
            },
            {
              title: 'Logo',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'ContactInfos.{language}.LogoUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'ImageGallery.0.ImageUrl',
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
              title: 'CustomId',
              component: CellComponent.StringCell,
              fields: { text: 'CustomId' },
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
              title: 'Active on Smg',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SmgActive' },
            },
            {
              title: 'Active',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
              params: { preventChange: 'true' },
            },
            {
              title: 'Published on',
              component: CellComponent.ArrayCell,
              fields: { items: 'PublishedOn' },
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
              title: 'Meta Title',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.MetaTitle',
              },
            },
            {
              title: 'Meta Description',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.MetaDesc',
              },
            },
            {
              title: 'Title',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.Title',
              },
            },
            {
              title: 'Header',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.Header',
              },
            },
            {
              title: 'SubHeader',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.SubHeader',
              },
            },
            {
              title: 'Intro Text',
              component: CellComponent.HtmlCell,
              fields: {
                html: 'Detail.{language}.IntroText',
              },
            },
            {
              title: 'BaseText',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.BaseText',
              },
            },
            {
              title: 'AdditionalText',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.AdditionalText',
              },
            },
            {
              title: 'GetThereText',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'Detail.{language}.GetThereText',
              },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'First Name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Givenname' },
            },
            {
              title: 'Surname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Surname' },
            },
            {
              title: 'Name prefix',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.NamePrefix' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat-ID',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Address' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'City',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.City' },
            },
            {
              title: 'Country',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ContactInfos.{language}.Url' },
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
      slug: 'Gps',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell,
              class: 'w-48',
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
    {
      name: 'Tags',
      slug: 'Tags',
      subcategories: [
        {
          name: 'Tags',
          properties: [
            {
              title: 'Open Data Hub Tags',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'ODHTags',
              },
              params: {
                fieldName: 'Id',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'SMG Tags',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'SmgTags',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
      ],
    },
  ],
};
