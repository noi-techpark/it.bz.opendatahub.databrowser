// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from 'lodash';
import { FieldConfig } from '../renderer/config.model';

export const mapAttributes = (
  item: Record<string, any>,
  field: FieldConfig
): any =>
  typeof field === 'string'
    ? get(item, field as string)
    : Object.keys(field).reduce((prev, key) => {
        const sourceField = (field as Record<string, string>)[key];
        const value = get(item, sourceField);
        return { ...prev, [key]: value };
      }, {});
