import { ComponentRenderer } from '../renderComponents/types';

const apiBaseUrl = 'https://api.tourism.testingmachine.eu';

const config: Record<string, ApiConfigEntry> = {
  'odh-activity-poi': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoi`,
      tableConfig: [
        {
          title: 'Image',
          component: ComponentRenderer.ImageRenderer,
          class: 'w-40',
          fields: {
            src: 'ImageGallery.[0].ImageUrl',
          },
        },
        {
          title: 'Title',
          component: ComponentRenderer.StringRenderer,
          class: 'w-48',
          fields: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Location',
          component: ComponentRenderer.TextHighlightRenderer,
          class: 'w-40',
          fields: {
            title: 'LocationInfo.RegionInfo.Name.{language}',
            subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
          },
        },
        {
          title: 'Languages',
          component: ComponentRenderer.ArrayRenderer,
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
          component: ComponentRenderer.EditedDateRenderer,
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
          component: ComponentRenderer.StringRenderer,
          class: 'w-36',
          fields: {
            text: 'Source',
          },
        },
        {
          title: 'ODH state',
          component: ComponentRenderer.StateRenderer,
          class: 'w-36',
          fields: {
            state: 'OdhActive',
          },
        },
      ],
    },
    detailEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoi/{id}`,
      detail: {},
    },
  },
  'odh-activity-poi-types': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes`,
      tableConfig: [
        {
          title: 'Image',
          component: ComponentRenderer.ImageRenderer,
          class: 'w-40',
          fields: {
            src: 'ImageGallery.[0].ImageUrl',
          },
        },
        {
          title: 'Title',
          component: ComponentRenderer.StringRenderer,
          class: 'w-48',
          fields: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Location',
          component: ComponentRenderer.TextHighlightRenderer,
          class: 'w-40',
          fields: {
            title: 'LocationInfo.RegionInfo.Name.{language}',
            subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
          },
        },
        {
          title: 'Languages',
          component: ComponentRenderer.ArrayRenderer,
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
          component: ComponentRenderer.EditedDateRenderer,
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
          component: ComponentRenderer.StringRenderer,
          class: 'w-36',
          fields: {
            text: 'Source',
          },
        },
        {
          title: 'ODH state',
          component: ComponentRenderer.StateRenderer,
          class: 'w-36',
          fields: {
            state: 'OdhActive',
          },
        },
      ],
    },
    detailEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
      detail: {},
    },
  },
  'odh-accommodation': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/Accommodation`,
      tableConfig: [
        {
          title: 'Image',
          component: ComponentRenderer.ImageRenderer,
          class: 'w-40',
          fields: {
            src: 'ImageGallery.[0].ImageUrl',
          },
        },
        {
          title: 'Title',
          component: ComponentRenderer.StringRenderer,
          class: 'w-48',
          fields: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Location',
          component: ComponentRenderer.TextHighlightRenderer,
          class: 'w-40',
          fields: {
            title: 'LocationInfo.RegionInfo.Name.{language}',
            subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
          },
        },
        {
          title: 'Languages',
          component: ComponentRenderer.ArrayRenderer,
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
          component: ComponentRenderer.EditedDateRenderer,
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
          component: ComponentRenderer.StringRenderer,
          class: 'w-36',
          fields: {
            text: 'Source',
          },
        },
        {
          title: 'ODH state',
          component: ComponentRenderer.StateRenderer,
          class: 'w-36',
          fields: {
            state: 'OdhActive',
          },
        },
      ],
    },
    detailEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
      detail: {},
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

export interface ApiConfigEntry {
  listEndpoint?: {
    url: string;
    tableConfig: TableColumnConfig[];
  };
  detailEndpoint?: {
    url: string;
    detail: {};
  };
}

export type ApiConfig = Record<keyof typeof config, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
