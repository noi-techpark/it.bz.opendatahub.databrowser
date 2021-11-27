import { GenericRendererElement } from '../components/cell-renderer/types';

const apiBaseUrl = 'https://api.tourism.testingmachine.eu';

const config: Record<string, ApiConfigEntry> = {
  'odh-activity-poi': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      path: `${apiBaseUrl}/v1/ODHActivityPoi`,
      table: [
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
      pagination: 'paged',
    },
    detailEndpoint: {
      path: `${apiBaseUrl}/v1/ODHActivityPoi/{id}`,
      detail: {},
    },
  },
  'odh-activity-poi-types': {
    // type: "tourism | mobility", => do not use
    listEndpoint: {
      path: `${apiBaseUrl}/v1/ODHActivityPoiTypes`,
      table: [
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
      pagination: 'paged',
    },
    detailEndpoint: {
      path: `${apiBaseUrl}/v1/ODHActivityPoiTypes/{id}`,
      detail: {},
    },
  },
};

export interface ApiConfigEntry {
  listEndpoint: {
    path: string;
    table: {
      title: string;
      component: string;
      fields: Record<string, string>;
    }[];
    pagination?: 'paged';
  };
  detailEndpoint: {
    path: string;
    detail: {};
  };
}

export type ApiConfig = Record<keyof typeof config, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
