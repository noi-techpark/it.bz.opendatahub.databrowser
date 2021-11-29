import { GenericRendererElement } from '../customElements/types';

const apiBaseUrl = 'https://api.tourism.testingmachine.eu';

const config: Record<string, ApiConfigEntry> = {
  'odh-activity-poi': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      url: `${apiBaseUrl}/v1/ODHActivityPoi`,
      tableConfig: [
        {
          title: 'ID',
          component: GenericRendererElement.STRING,
          fields: {
            text: 'Id',
          },
        },
        {
          title: 'Shortname',
          component: GenericRendererElement.STRING,
          fields: {
            text: 'Shortname',
          },
        },
        {
          title: 'GPS',
          component: GenericRendererElement.JSON,
          fields: {
            data: 'GpsInfo[0]',
          },
        },
      ],
      paginationType: 'tourism',
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
      paginationType: 'array',
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
}

export interface ApiConfigEntry {
  listEndpoint?: {
    url: string;
    tableConfig: TableColumnConfig[];
    paginationType: 'array' | 'tourism';
  };
  detailEndpoint?: {
    url: string;
    detail: {};
  };
}

export type ApiConfig = Record<keyof typeof config, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
