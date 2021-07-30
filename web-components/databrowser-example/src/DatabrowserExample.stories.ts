import { html, TemplateResult } from 'lit-html';
import '../databrowser-example';
import { UserType } from './DatabrowserExample';

export default {
  title: 'DatabrowserExample',
  component: 'databrowser-example',
  argTypes: {
    title: { control: 'text' },
    user: { control: 'object' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string | null;
  user?: UserType | undefined;
}

const Template: Story<ArgTypes> = ({ title, user }: ArgTypes) => html`
  <databrowser-example .title="${title}" .user="${user}"></databrowser-example>
`;

export const Regular = Template.bind({});
Regular.args = {
  title: 'Hello world',
  user: { name: 'John Doe', age: 23 },
};
