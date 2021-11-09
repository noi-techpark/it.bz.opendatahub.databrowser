/* eslint-disable lit/no-value-attribute */
import { html, LitElement, PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import * as MarkdownIt from 'markdown-it';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAPIV3 } from 'openapi-types';
import { debounce } from '../lib/debounce';

export type ParameterLocation = 'cookie' | 'query' | 'header' | 'path';

export interface FilterChanges {
  filter: Record<ParameterLocation, Record<string, string[]>>;
}

/**
 * This is the generic filter for OpenAPI described data.
 */
export class GenericFilter extends LitElement {
  @property()
  private parameters?: OpenAPIV3.ParameterObject[];

  // Keep an map of array fields (note: items can be added to and removed from array fields)
  // The number array is used as an ID tp be passed to the repeat directive (see https://lit.dev/docs/api/directives/#repeat)
  @state()
  private arrayFields: Record<string, number[]> = {};

  @state()
  private formValid = false;

  @query('form')
  private _form!: HTMLFormElement;

  private md = new MarkdownIt('default', { html: true });

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('parameters')) {
      this.validateFilters();
    }
  }

  private filterChanges() {
    const formData = new FormData(this._form);

    // Build a map of filter locations for parameters, where the filter value should be set (e.g in query, in path, ...)
    // A result could look like: {"param1": "query", "param2", "query", "param3": path}
    const parameterLocationMap: Record<string, ParameterLocation> =
      this.parameters == null
        ? {}
        : this.parameters.reduce(
            (prev, curr) => ({ ...prev, [curr.name]: curr.in }),
            {}
          );

    const settings: FilterChanges['filter'] = Array.from(
      formData.keys()
    ).reduce((prev, parameterName) => {
      // Remove empty filter values
      const parameterValues = formData
        .getAll(parameterName)
        .filter(value => value !== '');

      // If no filter values are set, then don't add filter info for parameter to result
      if (parameterValues.length === 0) {
        return prev;
      }

      // Check if the parameter name is known in the parameter-location map.
      // This should always be true, but checking it is not wrong
      const parameterLocation = parameterLocationMap[parameterName];
      if (parameterLocation == null) {
        // eslint-disable-next-line no-console
        console.error(
          `Filter location for parameter ${parameterName} is not known (e.g. in query, in header, ...)`
        );
        return prev;
      }

      // Add filter value for parameter to correct location (initialize location if not there yet)
      const enhancedParameterLocation =
        prev[parameterLocation] == null
          ? { [parameterName]: parameterValues }
          : { ...prev[parameterLocation], [parameterName]: parameterValues };

      return { ...prev, [parameterLocation]: enhancedParameterLocation };
    }, {} as FilterChanges['filter']);

    // Dispatch filter values
    const filterChangesValues: FilterChanges = { filter: settings };
    const event = new CustomEvent('filterChanges', {
      detail: filterChangesValues,
    });
    this.dispatchEvent(event);
  }

  private validateFilters() {
    this.formValid = this._form.checkValidity();
  }

  private renderFilterButton() {
    return html`<button
      type="button"
      ?disabled="${!this.formValid}"
      @click="${this.filterChanges}"
    >
      ${this.formValid ? 'Filter' : 'Required filter missing'}
    </button>`;
  }

  private addArrayItem(name: string) {
    const ids = this.arrayFields[name] ?? [];
    this.arrayFields[name] = [...ids, Math.random()];
    this.requestUpdate();
  }

  private removeArrayItem(name: string, idToRemove: number) {
    const ids = this.arrayFields[name] ?? [];
    this.arrayFields[name] = ids.filter(id => id !== idToRemove);
    this.requestUpdate();
  }

  private renderArray({ name, required }: OpenAPIV3.ParameterObject) {
    const ids = this.arrayFields[name] ?? [];
    return html` <div>
      ${repeat(
        ids,
        id => id,
        id => html`<div>
          <input
            name="${name}"
            ?required=${required}
            @keyup="${debounce(this.validateFilters, 50)}"
          /><button
            type="button"
            @click="${() => this.removeArrayItem(name, id)}"
          >
            -
          </button>
        </div>`
      )}
      <button type="button" @click="${() => this.addArrayItem(name)}">
        Add item
      </button>
    </div>`;
  }

  private renderBoolean(parameter: OpenAPIV3.ParameterObject) {
    return html`<select
      name="${parameter.name}"
      ?required=${parameter.required}
      @change="${debounce(this.validateFilters, 50)}"
    >
      <option value="">--</option>
      <option
        value="true"
        ?selected="${(parameter.schema as OpenAPIV3.SchemaObject)?.default ===
        true}"
      >
        true
      </option>
      <option
        value="false"
        ?selected="${(parameter.schema as OpenAPIV3.SchemaObject)?.default ===
        false}"
      >
        false
      </option>
    </select>`;
  }

  private renderInteger(parameter: OpenAPIV3.ParameterObject) {
    return html`<input
      type="number"
      name="${parameter.name}"
      ?required=${parameter.required}
      value="${ifDefined(
        (parameter.schema as OpenAPIV3.SchemaObject)?.default
      )}"
      @keyup="${debounce(this.validateFilters, 50)}"
    />`;
  }

  private renderString(parameter: OpenAPIV3.ParameterObject) {
    return html`<input
      name="${parameter.name}"
      ?required=${parameter.required}
      value="${ifDefined(
        (parameter.schema as OpenAPIV3.SchemaObject)?.default
      )}"
      @keyup="${debounce(this.validateFilters, 50)}"
    />`;
  }

  private renderDefault(parameter: OpenAPIV3.ParameterObject) {
    return html`<span
      >Type "${(parameter.schema as OpenAPIV3.SchemaObject)?.type}" not
      supported</span
    >`;
  }

  private renderParameter(parameter: OpenAPIV3.ParameterObject) {
    switch ((parameter.schema as OpenAPIV3.SchemaObject)?.type) {
      case 'array':
        return this.renderArray(parameter);
      case 'boolean':
        return this.renderBoolean(parameter);
      case 'integer':
        return this.renderInteger(parameter);
      case 'string':
        return this.renderString(parameter);
      default:
        return this.renderDefault(parameter);
    }
  }

  render() {
    return html`
      ${this.renderFilterButton()}
      <form>
        <table>
          ${this.parameters?.map(
            parameter =>
              html`<tr>
                <td>
                  <div>
                    <span>${parameter.name}</span>${parameter.required === true
                      ? html` <span>*required</span>`
                      : null}
                  </div>
                  <div>
                    ${(parameter.schema as OpenAPIV3.SchemaObject)?.type}${(
                      parameter.schema as OpenAPIV3.SchemaObject
                    )?.format != null
                      ? html`($${(parameter.schema as OpenAPIV3.SchemaObject)
                          ?.format})`
                      : null}
                  </div>
                  <div>(${parameter.in})</div>
                </td>
                <td>
                  <div>
                    ${parameter.description != null
                      ? unsafeHTML(this.md.render(parameter.description))
                      : null}
                  </div>
                  ${(parameter.schema as OpenAPIV3.SchemaObject)?.default !=
                  null
                    ? html`<div>
                        Default:
                        ${(parameter.schema as OpenAPIV3.SchemaObject)?.default}
                      </div>`
                    : null}
                  ${this.renderParameter(parameter)}
                </td>
              </tr>`
          )}
        </table>
      </form>
      ${this.renderFilterButton()}
    `;
  }
}
