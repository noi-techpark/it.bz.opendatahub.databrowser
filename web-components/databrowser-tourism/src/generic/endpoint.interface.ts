export type SchemaType =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'object'
  | 'number'
  | 'string';

export type SchemaFormat =
  | 'binary'
  | 'byte'
  | 'date'
  | 'date-span' // Note that ODH tourism API returns sometimes "date-span", although thats not part of OpenAPI standard
  | 'date-time'
  | 'double'
  | 'float'
  | 'int32'
  | 'int64'
  | 'password';

export type In = 'path' | 'query' | 'header' | 'cookie';

export type EndpointDescription =
  | 'Bad Request'
  | 'Internal Server Error'
  | 'List created'
  | 'Object created'
  | 'Request Error'
  | 'Server Error'
  | 'Success';

export interface SchemaItem {
  type: SchemaType;
}

export interface EndpointSchema {
  type: SchemaType;
  format?: SchemaFormat;
  default?: boolean | number | string;
  items?: SchemaItem;
}

export interface EndpointRef {
  $ref: string;
}

export interface EndpointApplicationJSON {
  schema: EndpointRef;
}

export interface EndpointContent {
  'text/plain': EndpointApplicationJSON;
  'application/json': EndpointApplicationJSON;
  'text/json': EndpointApplicationJSON;
  'text/csv': EndpointApplicationJSON;
}

export interface EndpointResponse {
  description: EndpointDescription;
  content?: EndpointContent;
}

export interface EndpointSecurity {
  oauth2: any[];
}

export interface EndpointParameter {
  name: string;
  in: In;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema: EndpointSchema;
}

export interface EndpointMethod {
  tags: string[];
  summary: string;
  operationId?: string;
  parameters: EndpointParameter[];
  responses: { [key: string]: EndpointResponse };
  security: EndpointSecurity[];
}

export interface EndpointPath {
  get?: EndpointMethod;
}
