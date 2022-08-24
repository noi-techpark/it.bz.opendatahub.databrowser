import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const gastronomyDetailView: DetailViewConfig = {
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
              title: 'Max Seating Capacity',
              component: CellComponent.StringCell,
              fields: { text: 'MaxSeatingCapacity' },
            },
            {
              title: 'Category',
              component: CellComponent.ArrayCellTags,
              fields: {
                items: 'CategoryCodes',
              },
              params: {
                fieldName: 'Shortname',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Facilities',
              component: CellComponent.ArrayCellTags,
              fields: {
                items: 'Facilities',
              },
              params: {
                fieldName: 'Shortname',
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
              title: 'Title',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Meta Title',
              component: CellComponent.StringCell,
              fields: { text: 'Meta Title' },
            },
            {
              title: 'Meta Desc',
              component: CellComponent.StringCell,
              fields: { text: 'MetaDesc' },
            },
            {
              title: 'Header',
              component: CellComponent.StringCell,
              fields: { text: 'Header' },
            },
            {
              title: 'Sub Header',
              component: CellComponent.StringCell,
              fields: { text: 'SubHeader' },
            },
            {
              title: 'Intro Text',
              component: CellComponent.StringCell,
              fields: { text: 'IntroText' },
            },
            {
              title: 'Base Text',
              component: CellComponent.StringCell,
              fields: { text: 'BaseText' },
            },
            {
              title: 'Additional Text',
              component: CellComponent.StringCell,
              fields: { text: 'AdditionalText' },
            },
            {
              title: 'Get There Text',
              component: CellComponent.StringCell,
              fields: { text: 'GetThereText' },
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
              title: 'Name Prefix',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.NamePrefix' },
            },
            {
              title: 'Tax number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
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
              title: 'Fax Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Faxnumber' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
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
