import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./index";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    //size: { control: "color" },
  },
  args: {
    children: "Submit",
    onClick: () => alert(),
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (arg) => <Button {...arg} />;

export const primary = Template.bind({});

primary.args = {
  size: "sm",
  variants: "primary",
};

export const Secondary = Template.bind({});

primary.args = {
  size: "sm",
  variants: "secondary",
};
