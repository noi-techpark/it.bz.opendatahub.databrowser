import { LitElement } from 'lit';
import { property } from 'lit/decorators';

/**
 * Render data as stringified JSON.
 */
export class BaseRenderer extends LitElement {
  @property()
  data?: any;

  @property()
  config?: any;
}
