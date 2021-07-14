import { html, LitElement, property } from 'lit-element';

export class DatabrowserExample extends LitElement {
  @property({ type: String }) title =
    'This is the databrowser-example Web Component';

  render() {
    return html` <p>${this.title}</p> `;
  }
}
