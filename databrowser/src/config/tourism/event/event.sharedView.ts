import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  dataStatesSubCategory,
  gpsDataCategory,
  imageGalleryCategory,
  municipalityIdCell,
  odhTagCategory,
  regionIdCell,
  shortnameWithLogoAndMainImageSubCategory,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        shortnameWithLogoAndMainImageSubCategory(),
        {
          name: 'IDs',
          properties: [
            {
              title: 'Tv Info',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Id' },
            },
            regionIdCell('LocationInfo.RegionInfo.Id'),
            {
              title: 'Area Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Id' },
            },
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
            {
              title: 'District Id',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictId' },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    gpsDataCategory(),
    {
      name: 'Files',
      slug: 'files',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'PDF',
              // TODO: use PDF upload
              component: CellComponent.EditImageGalleryCell,
              fields: {
                images: 'Pdf',
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
                active: '',
              },
            },
          ],
        },
      ],
    },
    odhTagCategory('event'),
    {
      name: 'Event details',
      slug: 'Event-details',
      subcategories: [
        {
          name: 'Time and date',
          properties: [
            {
              title: 'Date Begin',
              component: CellComponent.DateCell,
              fields: { date: 'DateBegin' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Date End',
              component: CellComponent.DateCell,
              fields: { date: 'EventDatesEnd' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Entrance',
              component: CellComponent.StringCell,
              fields: { text: 'Entrance' },
            },
          ],
        },
        {
          name: 'Organizer Info',
          properties: [
            {
              title: 'CompanyName',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CompanyName' },
            },
            {
              title: 'Tax Number',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Tax' },
            },
            {
              title: 'Vat',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Vat' },
            },
          ],
        },
        {
          name: 'Address',
          properties: [
            {
              title: 'Address',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Address' },
            },
            {
              title: 'Zip Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.ZipCode' },
            },
            {
              title: 'Country Name',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryName' },
            },
            {
              title: 'Country Code',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.CountryCode' },
            },
          ],
        },
        {
          name: 'Contact details',
          properties: [
            {
              title: 'Email',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Email' },
            },
            {
              title: 'Phonenumber',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Phonenumber' },
            },
            {
              title: 'Url',
              component: CellComponent.StringCell,
              fields: { text: 'ContactInfos.{language}.Url' },
            },
          ],
        },
        {
          name: 'Location',
          properties: [
            {
              title: 'Location',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region Name',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Single Days',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.SingleDays' },
            },
            {
              title: 'Ticket',
              component: CellComponent.StringCell,
              fields: { text: 'Ticket' },
            },
          ],
        },
        {
          name: 'Price',
          properties: [
            {
              title: 'Event Price',
              component: CellComponent.StringCell,
              fields: { text: 'EventPrice.0' },
            },
            {
              title: 'Type',
              component: CellComponent.StringCell,
              fields: { text: 'Type' },
            },
          ],
        },
        {
          name: 'Additional Information',
          properties: [
            {
              title: 'MinPersons',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.MinPersons' },
            },
            {
              title: 'MaxPersons',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.MaxPersons' },
            },
            {
              title: 'Ranc',
              component: CellComponent.StringCell,
              fields: { text: 'EventDate.Ranc' },
            },
            {
              title: 'SignOn',
              component: CellComponent.StringCell,
              fields: { text: 'SignOn' },
            },
            {
              title: 'PayMet',
              component: CellComponent.StringCell,
              fields: { text: 'PayMet' },
            },
            {
              title: 'Topics',
              component: CellComponent.ArrayTagsCell,
              fields: {
                items: 'Topics',
              },
              params: {
                fieldName: 'TopicInfo',
                separator: ', ',
                max: '3',
              },
            },
          ],
        },
      ],
    },
  ],
});
