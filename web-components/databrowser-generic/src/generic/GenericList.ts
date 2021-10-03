/* eslint-disable lit/no-value-attribute */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { mapAttributes } from '../lib/mapper.helper';
import { renderElementWithDataAttribute } from '../lib/render.helper';
import { ListConfig } from '../renderer/config.model';

export interface PageableList {
  TotalResults: number;
  TotalPages: number;
  CurrentPage: number;
  PreviousPage: string | null;
  NextPage: string | null;
  Seed?: string | null;
  Items: any[];
}

export interface PaginationChanges {
  url: string;
}

export interface DetailRequested {
  url: string;
}

/**
 * This is the generic list Web Component for OpenAPI described data.
 */
export class GenericList extends LitElement {
  @property({ type: Array })
  data?: any[];

  @property({ type: Object })
  config?: ListConfig;

  private paginationChanges(url: string | null) {
    if (url == null) {
      return;
    }

    const paginationChanges: PaginationChanges = { url };

    const event = new CustomEvent('paginationChanges', {
      detail: paginationChanges,
    });

    this.dispatchEvent(event);
  }

  private detailRequested(url: string | null) {
    if (url == null) {
      return;
    }

    const detailRequested: DetailRequested = { url };

    const event = new CustomEvent('detailRequested', {
      detail: detailRequested,
    });

    this.dispatchEvent(event);
  }

  private renderTableHeader(config: ListConfig) {
    return html`<thead>
      <tr>
        ${config.columns.map(col => html`<th>${col.title}</th>`)}
      </tr>
    </thead>`;
  }

  private renderTableBody(data: any[], config: ListConfig) {
    return html`
      <tbody>
        ${data.map(
          item => html`<tr>
            ${config.columns.map(col => {
              const componentName =
                typeof col.component === 'string'
                  ? col.component
                  : col.component.name;
              const dataAttributeValue = mapAttributes(item, col.field);
              const configAttributeValue =
                typeof col.component === 'string' ? null : col.component.config;

              return html`<td>
                ${renderElementWithDataAttribute({
                  componentName,
                  dataAttributeValue,
                  configAttributeValue,
                })}
              </td>`;
            })}
          </tr>`
        )}
      </tbody>
    `;
  }

  private renderResult(data: any[], config?: ListConfig) {
    if (data == null) {
      return null;
    }
    if (config == null) {
      return html`<table>
        <tbody>
          ${data.map(
            item =>
              html`<tr>
                <td><pre>${JSON.stringify(item, null, 2)}</pre></td>
              </tr>`
          )}
        </tbody>
      </table>`;
    }
    return html`
      <table>
        ${this.renderTableHeader(config)} ${this.renderTableBody(data, config)}
      </table>
    `;
  }

  render() {
    return html`
      ${this.data != null
        ? this.renderResult(this.data, this.config)
        : html`<span>No data</span>`}
    `;
  }
}
