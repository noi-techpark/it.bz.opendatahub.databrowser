import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';

export const articleEditView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Type' },
              params: {
                url: 'https://api.tourism.testingmachine.eu/v1/ArticleTypes',
                labelSelector: 'Key',
                keySelector: 'Key',
              },
              required: true,
            },
            {
              title: 'Shortname',
              component: CellComponent.InputSingleLineCell,
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
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
        {
          name: 'Detail',
          properties: [
            {
              title: 'Title',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Detail.{language}.Title' },
            },
            {
              title: 'Header',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Detail.{language}.Header' },
            },
            {
              title: 'Subheader',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Detail.{language}.SubHeader' },
            },
            {
              title: 'Intro text',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Detail.{language}.IntroText' },
            },
            {
              title: 'Base text',
              component: CellComponent.InputSingleLineCell,
              fields: { html: 'Detail.{language}.BaseText' },
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
              fields: { text: 'AccoDetail.{language}.Name' },
            },
            {
              title: 'First Name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Firstname' },
            },
            {
              title: 'Surname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Lastname' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Street' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Zip' },
            },
            {
              title: 'City',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.City' },
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'AccoDetail.{language}.Phone' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.InputSingleLineCell,
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
                source: 'ImageSource',
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
            {
              title: 'Tourismorganization',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'TourismorganizationId' },
            },
            {
              title: 'Municipality',
              component: CellComponent.InputSingleLineCell,
              fields: {
                text: 'LocationInfo.MunicipalityInfo.Name.{language}',
              },
            },
            {
              title: 'District',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
  ],
};
