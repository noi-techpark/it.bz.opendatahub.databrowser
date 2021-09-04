/* eslint-disable lit/no-value-attribute */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export interface ResultList {
  TotalResults: number;
  TotalPages: number;
  CurrentPage: number;
  PreviousPage: string | null;
  NextPage: string | null;
  Seed: string | null;
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
  data?: ResultList;

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

  private renderResultHeader(data: ResultList) {
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

  private renderPagination(data: ResultList) {
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

  private renderResult(data: ResultList) {
    return html`<div>${this.renderResultHeader(data)}</div>
      <div>${this.renderPagination(data)}</div>
      ${this.data?.Items.map(
        item =>
          html`<div style="border: 1px dotted black">
            <div>
              <a href="${item.Self}" target="_blank">Open in new tab</a>
            </div>
            <pre>${JSON.stringify(item, null, 2)}</pre>
          </div>`
      )}
      <div>${this.renderPagination(data)}</div>`;
  }

  render() {
    return html`
      ${this.data != null
        ? this.renderResult(this.data)
        : html`<span>No data</span>`}
    `;
  }
}
