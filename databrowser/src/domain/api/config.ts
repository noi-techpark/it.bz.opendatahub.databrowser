import { CellComponent } from '../cellComponents/types';

const apiBaseUrl = 'https://api.tourism.testingmachine.eu';

const config: Record<string, ApiConfigEntry> = {
  // type: "tourism | mobility", => do not use
  'odh-activity-poi': {
    description: {
      title: 'Activities and points of interest',
      subtitle:
        'This dataset contains a collection of activities and Points of Interest (PoI) in the South Tyrol region. The available data have been extracted from different sources and also offer IDM categorisation. This is a kind of superdataset, which includes also poi dataset, activity dataset, and gastronomy dataset.',
    },
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoi`,
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
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Categories',
          component: CellComponent.StringCell,
          class: 'w-40',
          fields: {
            text: 'AdditionalPoiInfos.{language}.MainType',
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
          title: 'Source state',
          component: CellComponent.StateCell,
          class: 'w-36',
          fields: {
            state: 'Active',
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
      url: `${apiBaseUrl}/v1/ODHActivityPoi/{id}`,
      viewConfig: [
        {
          name: 'Main data',
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
                {
                  title: 'Custom ID',
                  component: CellComponent.StringCell,
                  fields: { text: 'CustomId' },
                },
                {
                  title: 'Outdoor Active ID',
                  component: CellComponent.StringCell,
                  fields: { text: 'OutdooractiveID' },
                },
              ],
            },
            {
              name: 'Data states',
              properties: [
                {
                  title: 'Last Changes',
                  component: CellComponent.StringCell,
                  fields: { text: 'LastChange' },
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
                {
                  title: 'Interface',
                  component: CellComponent.StringCell,
                  fields: { text: 'SyncSourceInterface' },
                },
                {
                  title: 'Update mode',
                  component: CellComponent.StringCell,
                  fields: { text: 'SyncUpdateMode' },
                },
              ],
            },
          ],
        },
        {
          name: 'Text information',
          subcategories: [
            {
              name: 'Text data',
              properties: [
                {
                  title: 'Meta title',
                  component: CellComponent.StringCell,
                  fields: { text: 'Detail.{language}.MetaTitle' },
                },
                {
                  title: 'Meta description',
                  component: CellComponent.StringCell,
                  fields: { text: 'Detail.{language}.MetaDesc' },
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
                  title: 'Introtext',
                  component: CellComponent.StringCell,
                  fields: { text: 'Detail.{language}.IntroText' },
                },
                {
                  title: 'Base Text',
                  component: CellComponent.HtmlCell,
                  fields: { html: 'Detail.{language}.BaseText' },
                },
                {
                  title: 'Additional Text',
                  component: CellComponent.HtmlCell,
                  fields: { html: 'Detail.{language}.AdditionalText' },
                },
                {
                  title: 'Get There Text',
                  component: CellComponent.HtmlCell,
                  fields: { html: 'Detail.{language}.GetThereText' },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  'odh-activity-poi-types': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes`,
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
            text: 'Detail.{language}.Title',
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
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
      viewConfig: [
        { name: 'Main data', subcategories: [] },
        { name: 'Text information', subcategories: [] },
      ],
    },
  },
  'odh-accommodation': {
    // type: "tourism | mobility", => do not use
    description: {
      title: 'Accommodation',
      subtitle:
        'This dataset contains various data about accommodation in South Tyrol, including information about the rooms.',
    },
    listEndpoint: {
      url: `${apiBaseUrl}/v1/Accommodation`,
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
            text: 'Detail.{language}.Title',
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
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
      viewConfig: [
        { name: 'Main data', subcategories: [] },
        { name: 'Text information', subcategories: [] },
      ],
    },
  },
};

export interface TableColumnConfig {
  title: string;
  component: string;
  fields: Record<string, string>;
  params?: Record<string, string>;
  class?: string;
}

export interface DetailViewConfig {
  name: string;
  subcategories: {
    name: string;
    properties: {
      title: string;
      component: string;
      fields: Record<string, string>;
      params?: Record<string, string>;
      class?: string;
    }[];
  }[];
}

export interface ApiConfigEntry {
  description?: {
    title?: string;
    subtitle?: string;
  };
  listEndpoint?: {
    url: string;
    tableConfig: TableColumnConfig[];
  };
  detailEndpoint?: {
    url: string;
    viewConfig: DetailViewConfig[];
  };
}

export type ApiConfig = Record<keyof typeof config, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
