import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  imageGalleryCategory,
  municipalityIdCell,
  odhTagCategory,
  regionIdCell,
  shortnameWithLogoAndMainImageSubCategory,
  sourceSubCategory,
  textInfoCategory,
  idReadOnlyCell,
  locationCategory,
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
            idReadOnlyCell(),
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
    contactCategory(),
    imageGalleryCategory(),
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
              title: 'Company / Name',
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
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('event'),
  ],
});
