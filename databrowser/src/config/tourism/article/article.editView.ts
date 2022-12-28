import { CellComponent } from '../../../domain/cellComponents/types';
import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { ID_READONLY_CONFIG, IMAGE_GALLERY_CONFIG } from '../configBuilder';

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
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [ID_READONLY_CONFIG],
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
              params: { readonly: 'true' },
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
          name: '',
          properties: [
            {
              title: 'Meta Title',
              component: CellComponent.StringCell,
              fields: { text: 'MetaTitle' },
            },
            {
              title: 'Meta Description',
              component: CellComponent.StringCell,
              fields: { text: 'MetaDesc' },
            },
            {
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Title' },
            },
            {
              title: 'Header',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.Header' },
            },
            {
              title: 'Subheader',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.SubHeader' },
            },
            {
              title: 'Intro text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.IntroText' },
            },
            {
              title: 'Base text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.BaseText' },
            },
            {
              title: 'Additional text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.AdditionalText' },
            },
            {
              title: 'Get there text',
              component: CellComponent.StringCell,
              fields: { text: 'Detail.{language}.GetThereText' },
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
              fields: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'First Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Givenname' },
            },
            {
              title: 'Surname',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Surname' },
            },
            {
              title: 'Name prefix',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.NamePrefix' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat-ID',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Street and House No',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Address' },
            },
            // TODO: check which field to use
            {
              title: 'Complement',
              component: CellComponent.StringCell,
              fields: { text: 'Complement' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.City' },
            },
            {
              title: 'Country',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Abbrevation',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Mobile Phone',
              component: CellComponent.StringCell,
              fields: { text: '' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Url' },
            },
            // TODO: check which field to use
            {
              title: 'Additional URL (Independent URL)',
              component: CellComponent.StringCell,
              fields: { text: 'AdditionalUrl' },
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
      name: 'Additional Information',
      slug: 'additional-information',
      subcategories: [
        {
          name: '',
          properties: [
            // TODO: check which field to use
            {
              title: 'Category',
              component: CellComponent.StringCell,
              fields: { text: 'Category' },
            },
            // TODO: check which field to use
            {
              title: 'Description',
              component: CellComponent.StringCell,
              fields: { text: 'Description' },
            },
          ],
        },
      ],
    },
    {
      // TODO: implement link table
      name: 'Links',
      slug: 'links',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Link name',
              component: CellComponent.JsonCell,
              fields: {
                data: 'ArticleLinkInfo.{language}.Elements',
              },
            },
            {
              title: 'Link URL',
              component: CellComponent.JsonCell,
              fields: {
                data: 'ArticleLinkInfo.{language}.Elements',
              },
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
          name: '',
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
          ],
        },
      ],
    },
    {
      name: 'Article Details',
      slug: 'article-details',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Highlight' },
            },
            {
              title: 'Main Type',
              component: CellComponent.StringCell,
              fields: { text: 'Type' },
            },
            {
              title: 'Sub Type',
              component: CellComponent.StringCell,
              fields: { text: 'SubType' },
            },
            {
              title: 'Article Date',
              component: CellComponent.StringCell,
              fields: { text: 'ArticleDate' },
            },
            {
              title: 'Article Date To',
              component: CellComponent.StringCell,
              fields: { text: 'ArticleDateTo' },
            },
          ],
        },
      ],
    },
  ],
};
