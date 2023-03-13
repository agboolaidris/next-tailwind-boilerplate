import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './index';

export default {
  argTypes: {
    //size: { control: "color" },
  },
  args: {
    children: 'Submit',
    onClick: () => alert(),
  },
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (arg) => <Button {...arg} />;

export const primary = Template.bind({});

primary.args = {
  size: 'md',
  variants: 'primary',
};

export const Secondary = Template.bind({});
primary.args = {
  size: 'md',
  variants: 'secondary',
};
