import { GenericRendererElement } from '../customElements/types';

const apiBaseUrl = 'https://api.tourism.testingmachine.eu';

const config: Record<string, ApiConfigEntry> = {
  'odh-activity-poi': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoi`,
      tableConfig: [
        {
          title: 'Image',
          component: GenericRendererElement.IMAGE,
          class: 'block w-40',
          fields: {
            src: 'ImageGallery.[0].ImageUrl',
          },
        },
        {
          title: 'Title',
          component: GenericRendererElement.STRING,
          fields: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Location',
          component: GenericRendererElement.TEXT_HIGHLIGHT,
          fields: {
            title: 'LocationInfo.RegionInfo.Name.{language}',
            subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
          },
        },
        {
          title: 'Languages',
          component: GenericRendererElement.ARRAY,
          fields: {
            items: 'HasLanguage',
          },
          params: {
            separator: ', ',
          },
          class: 'block w-36',
        },
        {
          title: 'Edited',
          component: GenericRendererElement.DATE,
          fields: {
            date: 'LastChange',
          },
        },
        {
          title: 'Source',
          component: GenericRendererElement.STRING,
          fields: {
            text: 'Source',
          },
        },
        {
          title: 'ODH state',
          component: GenericRendererElement.STATE,
          fields: {
            state: 'OdhActive',
          },
          class: 'block w-36',
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
          title: 'ID',
          component: GenericRendererElement.STRING,
          fields: {
            text: 'Id',
          },
        },
        {
          title: 'TypeDesc',
          component: GenericRendererElement.JSON,
          fields: {
            typeDesc: 'TypeDesc',
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
