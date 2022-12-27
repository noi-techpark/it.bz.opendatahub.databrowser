import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';
import { IMAGE_GALLERY_CONFIG } from '../configBuilder';

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
              title: 'Title',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Detail.{language}.Title' },
            },
            {
              title: 'Shortname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Logo',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'LogoUrl',
              },
              params: {
                width: '15%',
              },
            },

            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { text: 'Highlight' },
            },
            {
              title: 'Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'Type' },
              params: {
                url: withOdhBaseUrl('/v1/ArticleTypes'),
                labelSelector: 'Key',
                keySelector: 'Key',
              },
              required: true,
            },
            {
              title: 'Sub Type',
              component: CellComponent.InputReferenceCell,
              fields: { value: 'SubType' },
              params: {
                url: withOdhBaseUrl('/v1/ArticleTypes'),
                labelSelector: 'Key',
                keySelector: 'Key',
              },
              required: true,
            },
            {
              title: 'Article Date',
              component: CellComponent.DateCell,
              class: 'w-40',
              fields: {
                date: 'ArticleDate',
              },
              params: {
                format: 'do MMMM yyyy HH:mm',
              },
            },
            {
              title: 'Article Date To',
              component: CellComponent.DateCell,
              class: 'w-40',
              fields: {
                date: 'ArticleDateTo',
              },
              params: {
                format: 'do MMMM yyyy HH:mm',
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
              component: CellComponent.EditedDateCell,
              class: 'w-40',
              fields: {
                date: 'LastChange',
              },
              params: {
                format: 'do MMMM yyyy HH:mm',
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
              params: { preventChange: 'true' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.ToggleCell,
              fields: { text: 'SmgActive' },
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
              class: 'break-all',
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
            {
              title: 'Additional text',
              component: CellComponent.InputSingleLineCell,
              fields: { html: 'Detail.{language}.AdditionalText' },
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
    {
      name: 'Tags',
      slug: 'tags',
      subcategories: [
        {
          name: 'Open Data Hub Tags',
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
