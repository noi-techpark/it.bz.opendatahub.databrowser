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
                  component: CellComponent.JsonCell,
                  fields: { data: 'Shortname' },
                },
              ],
            },
            {
              name: 'IDs',
              properties: [
                {
                  title: 'ID',
                  component: CellComponent.JsonCell,
                  fields: { data: 'Id' },
                },
                {
                  title: 'Custom ID',
                  component: CellComponent.JsonCell,
                  fields: { data: 'CustomId' },
                },
                {
                  title: 'Outdoor Active ID',
                  component: CellComponent.JsonCell,
                  fields: { data: 'OutdooractiveID' },
                },
              ],
            },
            {
              name: 'Data states',
              properties: [
                {
                  title: 'Last Changes',
                  component: CellComponent.JsonCell,
                  fields: { data: 'LastChange' },
                },
                {
                  title: 'Active on Source',
                  component: CellComponent.JsonCell,
                  fields: { data: 'Active' },
                },
                {
                  title: 'Active on ODH',
                  component: CellComponent.JsonCell,
                  fields: { data: 'OdhActive' },
                },
              ],
            },
            {
              name: 'Source',
              properties: [
                {
                  title: 'Source',
                  component: CellComponent.JsonCell,
                  fields: { data: 'Source' },
                },
                {
                  title: 'Interface',
                  component: CellComponent.JsonCell,
                  fields: { data: 'SyncSourceInterface' },
                },
                {
                  title: 'Update mode',
                  component: CellComponent.JsonCell,
                  fields: { data: 'SyncUpdateMode' },
                },
              ],
            },
          ],
        },
        { name: 'Text information', subcategories: [] },
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
