// This file contains base render configurations for known OpenAPI endpoints

import { GenericRendererElement } from './renderer.enum';
import {
  ListConfig,
  ResourceConfig,
} from '~/../web-components/databrowser-generic/src/renderer/config.model';

export type OpenApiPathRenderConfig = Record<
  string,
  ListConfig | ResourceConfig
>;

export type OpenApiRenderConfig = Record<string, OpenApiPathRenderConfig>;

// TODO: this config is suitable for databrowser-generic-list and databrowser-generic-resource
// Web-Components only. Think about further generalizing the rendering in order to replace
// those generic renderers with other facilities
export const openApiRenderConfig: OpenApiRenderConfig = {
  tourism: {
    '/v1/Accommodation': {
      columns: [
        {
          field: 'Id',
          component: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'Shortname',
          component: GenericRendererElement.STRING,
          title: 'Shortname',
        },
        {
          field: 'AccoType.Id',
          component: GenericRendererElement.STRING,
          title: 'AccoType ID',
        },
        {
          field: 'ODHTags[1].Id',
          component: GenericRendererElement.STRING,
          title: 'ODHTags[1] ID',
        },
        {
          field: 'ThemeIds',
          component: GenericRendererElement.JSON,
          title: 'ThemeIds',
        },
      ],
    },
    '/v1/Accommodation/{id}': {
      props: [
        {
          field: 'Id',
          component: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'Self',
          component: GenericRendererElement.STRING,
          title: 'Self',
        },
      ],
    },
    '/v1/AccommodationTypes': {
      columns: [
        {
          field: 'Id',
          component: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'Key',
          component: GenericRendererElement.STRING,
          title: 'Key',
        },
        {
          field: 'Type',
          component: GenericRendererElement.STRING,
          title: 'Type',
        },
        {
          field: 'Bitmask',
          component: GenericRendererElement.STRING,
          title: 'Bitmask',
        },
        {
          field: 'TypeDesc',
          component: GenericRendererElement.JSON,
          title: 'TypeDesc',
        },
      ],
    },
  },
  mobility: {
    '/v1/parking/rest/get-station-details': {
      columns: [
        {
          field: 'id',
          component: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'name',
          component: GenericRendererElement.STRING,
          title: 'Name',
        },
        {
          field: 'latitude',
          component: GenericRendererElement.STRING,
          title: 'Latitude',
        },
        {
          field: 'longitude',
          component: GenericRendererElement.STRING,
          title: 'Longitude',
        },
      ],
    },
  },
};
