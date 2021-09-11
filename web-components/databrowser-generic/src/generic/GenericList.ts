/* eslint-disable lit/no-value-attribute */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { get } from 'lodash-es';
import { TableConfig } from '../renderer/config.model';

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
 * This is the generic filter for OpenAPI described data.
 */
export class GenericList extends LitElement {
  @property({ type: Object })
  data?: PageableList;

  @property({ type: Object })
  config?: TableConfig;

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
    return html`<ul>
      <li>TotalResults: ${data.TotalResults}</li>
      <li>TotalPages: ${data.TotalPages}</li>
      <li>CurrentPage: ${data.CurrentPage}</li>
    </ul>`;
  }

  private renderResultItem(item: any) {
    return html`<tr>
      <td>${item.Detail.en?.Title}</td>
      <td>${item.LocationInfo.RegionInfo.Name?.en}</td>
      <td>${item.HasLanguage != null ? item.HasLanguage.join(', ') : ''}</td>
      <td>${item.Source}</td>
      <td>${item.Active}</td>
      <td>
        <button @click="${() => this.detailRequested(item.Self)}">
          Load Detail
        </button>
      </td>
    </tr>`;
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

  private renderTableHeader(config: TableConfig) {
    return html`<thead>
      <tr>
        ${config.columns.map(col => html`<th>${col.title}</th>`)}
      </tr>
    </thead>`;
  }

  private renderElement(name: string, data: any) {
    return staticHtml`<${unsafeStatic(name)} .data="${data}" />`;
  }

  private renderTableBody(data: PageableList, config: TableConfig) {
    return html`
      <tbody>
        ${data.Items.map(
          item => html`<tr>
            ${config.columns.map(
              col =>
                html`<td>
                  ${this.renderElement(
                    col.rendererTagName,
                    get(item, col.field)
                  )}
                </td>`
            )}
          </tr>`
        )}
      </tbody>
    `;
  }

  private renderTable(data: PageableList, config?: TableConfig) {
    if (data == null || config == null) {
      return null;
    }
    return html`
      <table>
        ${this.renderTableHeader(config)} ${this.renderTableBody(data, config)}
      </table>
    `;
  }

  private renderResult(data: PageableList, config?: TableConfig) {
    return html`<div>${this.renderResultHeader(data)}</div>
      <div>${this.renderPagination(data)}</div>
      ${this.renderTable(data, config)}
      <div>${this.renderPagination(data)}</div>`;
  }

  render() {
    return html`
      ${this.data != null
        ? this.renderResult(this.data, this.config)
        : html`<span>No data</span>`}
    `;
  }
}
