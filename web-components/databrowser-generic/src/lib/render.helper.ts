import { html as staticHtml, unsafeStatic } from 'lit/static-html';

export const renderElement = (tagName: string, data: any) =>
  staticHtml`<${unsafeStatic(tagName)} .data="${data}" />`;
