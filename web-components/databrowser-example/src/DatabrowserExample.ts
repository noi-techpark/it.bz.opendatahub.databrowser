import { html, LitElement, property } from 'lit-element';

export interface UserType {
  age: number;
  name: string;
}

export interface DatabrowserExampleProps {
  user: UserType;
}

export class DatabrowserExample extends LitElement {
  @property({ type: String }) title =
    'This is the databrowser-example Web Component';

  @property()
  user: UserType | undefined;

  render() {
    return html`
      <p>${this.title}</p>

      <p>
        ${this.user != null
          ? html`<span
              >${this.user?.name} is ${this.user?.age} years old!</span
            >`
          : null}
      </p>
    `;
  }
}
