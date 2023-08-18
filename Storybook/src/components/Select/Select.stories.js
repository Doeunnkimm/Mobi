import { action } from "@storybook/addon-actions";
import Select from "./Select";
import { useState } from "react";

const meta = {
  title: "components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "clicked" },
    isBorder: { control: "boolean" },
  },
  parameters: {
    actions: {
      handles: ["click li"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = ({ ...args }) => {
  const [selectedValue, setValue] = useState("red");

  const handleSelect = (key) => {
    setValue(key);
    action("onClick")(key);
  };

  return (
    <Select
      selectedValue={selectedValue}
      onClick={handleSelect}
      options={{
        red: { title: "빨간색" },
        orange: { title: "주황색" },
        yellow: { title: "노란색" },
      }}
      {...args}
    />
  );
};

Default.args = {
  isBorder: true,
};

export const SelectColor = ({ ...args }) => {
  const [selectedValue, setValue] = useState("red");

  const handleSelect = (key) => {
    setValue(key);
    action("onClick")(key);
  };

  return (
    <Select
      selectedValue={selectedValue}
      onClick={handleSelect}
      options={{
        red: { title: "빨간색" },
        orange: { title: "주황색" },
        skyblue: { title: "하늘색" },
        lightPink: { title: "분홍색" },
        lightGreen: { title: "연두색" },
      }}
      color={selectedValue}
      {...args}
    />
  );
};

SelectColor.args = {
  isBorder: true,
};
