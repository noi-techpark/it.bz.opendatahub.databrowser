/* eslint-disable lit/no-value-attribute */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { mapAttributes } from '../lib/mapper.helper';
import { renderElementWithDataAttribute } from '../lib/render.helper';
import { ResourceConfig } from '../renderer/config.model';

/**
 * This is the generic resource Web Component for OpenAPI described data.
 */
export class GenericResource extends LitElement {
  @property({ type: Object })
  data?: Record<string, any>;

  @property({ type: Object })
  config?: ResourceConfig;

  private renderResult(
    data: Record<string, any>,
    config: ResourceConfig | undefined
  ): unknown {
    if (config == null) {
      return html`${JSON.stringify(data)}`;
    }
    return html` ${config.props.map(prop => {
      const componentName =
        typeof prop.component === 'string'
          ? prop.component
          : prop.component.name;
      const dataAttributeValue = mapAttributes(data, prop.field);
      const configAttributeValue =
        typeof prop.component === 'string' ? null : prop.component.config;

      return html`<div>
        ${renderElementWithDataAttribute({
          componentName,
          dataAttributeValue,
          configAttributeValue,
        })}
      </div>`;
    })}`;
  }

  render() {
    return html`
      ${this.data != null
        ? this.renderResult(this.data, this.config)
        : html`<span>No data</span>`}
    `;
  }
}
