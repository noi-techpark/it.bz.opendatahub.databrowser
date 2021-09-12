/* eslint-disable lit/no-value-attribute */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { get } from 'lodash-es';
import { renderElement } from '../lib/render.helper';
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
  @property({ type: Object })
  data?: PageableList;

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

  private renderResultHeader(data: PageableList) {
    if (data.TotalPages === 1) {
      return null;
    }
    return html`<ul>
      <li>TotalResults: ${data.TotalResults}</li>
      <li>TotalPages: ${data.TotalPages}</li>
      <li>CurrentPage: ${data.CurrentPage}</li>
    </ul>`;
  }

  private renderPagination(data: PageableList) {
    return html`<div>
      ${data.PreviousPage != null
        ? html`<button
            @click="${() => this.paginationChanges(data.PreviousPage)}"
          >
            Previous
          </button>`
        : null}
      ${data.NextPage != null
        ? html`<button @click="${() => this.paginationChanges(data.NextPage)}">
            Next
          </button>`
        : null}
    </div>`;
  }

  private renderTableHeader(config: ListConfig) {
    return html`<thead>
      <tr>
        ${config.columns.map(col => html`<th>${col.title}</th>`)}
      </tr>
    </thead>`;
  }

  private renderTableBody(data: PageableList, config: ListConfig) {
    return html`
      <tbody>
        ${data.Items.map(
          item => html`<tr>
            ${config.columns.map(
              col =>
                html`<td>
                  ${renderElement(col.rendererTagName, get(item, col.field))}
                </td>`
            )}
          </tr>`
        )}
      </tbody>
    `;
  }

  private renderList(data: PageableList, config?: ListConfig) {
    if (data == null || config == null) {
      return null;
    }
    return html`
      <table>
        ${this.renderTableHeader(config)} ${this.renderTableBody(data, config)}
      </table>
    `;
  }

  private renderResult(data: PageableList, config?: ListConfig) {
    return html`${this.renderResultHeader(data)} ${this.renderPagination(data)}
    ${this.renderList(data, config)} ${this.renderPagination(data)}`;
  }

  render() {
    return html`
      ${this.data != null
        ? this.renderResult(this.data, this.config)
        : html`<span>No data</span>`}
    `;
  }
}
