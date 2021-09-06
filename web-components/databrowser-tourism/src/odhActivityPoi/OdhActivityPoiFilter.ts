import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

export interface FilterChanges {
  type: string | null;
  active: boolean | null;
}

/**
 * This is the filter view for API v1 ODHActivityPoi.
 */
export class OdhActivityPoiFilter extends LitElement {
  @property({ type: String })
  type: string = '63';

  @property({ type: Boolean })
  active: boolean | null = null;

  @query('#filter-type')
  filterType!: HTMLInputElement;

  @query('#filter-active')
  filterActive!: HTMLSelectElement;

  static get styles() {
    return css`
      .block {
        display: block;
      }
      .mt-1 {
        margin-top: 1em;
      }
    `;
  }

  private filterChanges() {
    const filterChangesValues: FilterChanges = {
      type: this.getType(),
      active: this.getActive(),
    };

    const event = new CustomEvent('filterChanges', {
      detail: filterChangesValues,
    });
    this.dispatchEvent(event);
  }

  private getType(): string | null {
    return this.filterType.value.length ? this.filterType.value : null;
  }

  private getActive(): boolean | null {
    if (this.filterActive.value === 'true') {
      return true;
    }
    if (this.filterActive.value === 'false') {
      return false;
    }
    return null;
  }

  render() {
    return html`
      <form>
        <div>
          <label for="filter-type" class="block">Type</label>
          <small class="block"
            >(Type of the ODHActivityPoi ('null' = Filter disabled, possible
            values: BITMASK: 1 = Wellness, 2 = Winter, 4 = Summer, 8 = Culture,
            16 = Other, 32 = Gastronomy), (default: 63 == ALL), REFERENCE TO:
            GET /api/ODHActivityPoiTypes)</small
          >
          <input
            type="text"
            id="filter-type"
            name="filter-type"
            .value="${this.type}"
          />
        </div>
        <div class="mt-1">
          <label for="filter-active" class="block"
            >Active ODHActivityPoi Filter
          </label>
          <small class="block"
            >(possible Values: 'true' only active ODHActivityPoi, 'false' only
            not active ODHActivityPoi), (default:'null')</small
          >
          <select
            id="filter-active"
            name="filter-active"
            .value="${this.active}"
          >
            <option value="null">--</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <div class="mt-1">
          <button type="button" @click="${this.filterChanges}">
            Load data
          </button>
        </div>
      </form>
    `;
  }
}
