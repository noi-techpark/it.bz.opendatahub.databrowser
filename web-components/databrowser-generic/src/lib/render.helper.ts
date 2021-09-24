// eslint-disable-next-line import/no-extraneous-dependencies
import { html as staticHtml, unsafeStatic } from 'lit/static-html';

export interface RenderElementWithDataAttributeParameters {
  componentName: string;
  dataAttributeValue: any;
  configAttributeValue?: any;
}

export const renderElementWithDataAttribute = ({
  componentName,
  dataAttributeValue,
  configAttributeValue,
}: RenderElementWithDataAttributeParameters) =>
  staticHtml`<${unsafeStatic(
    componentName
  )} .data="${dataAttributeValue}" .config="${configAttributeValue}"/>`;

/**
 * This is an experimental function that uses an attribute map to set attributes
 * on the element to create.
 *
 * THIS FUNCTION IS INTENDED FOR INTERNAL USE ONLY!!!
 *
 * The function exists solely to mitigate some aspects of missing spread support
 * for attributes in lit.dev (see also https://github.com/lit/lit/issues/923).
 *
 * Note that the attribute mapping works for HTML attributes only, i.e. objects
 * will be serialized to [object Object] which most of the time is not what was
 * intended.
 *
 * TODO:
 * - check for a better implementation
 *
 * @param tagName
 * @param attributes
 * @param item
 * @returns
 */
export const _renderElementWithMappedAttributes = (
  tagName: string,
  attributes: Record<string, any>,
  item: any
) => {
  const attributesAsString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${item[value]}"`)
    .join(' ');
  const elem = `<${tagName} ${attributesAsString}></${tagName}>`;

  return staticHtml`${unsafeStatic(elem)}`;
};
