import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    color: { control: "radio", options: ["default", "success", "error"] },
    status: { control: "radio", options: ["default", "success", "error"] },
    message: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "30rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const handleInputVal = (e) => {
  action("onChange")(e.target.value);
};

export const Default = {
  render: ({ ...args }) => {
    return <Input {...args} />;
  },
  args: {
    label: "이메일",
    onChange: handleInputVal,
  },
};

export const DefaultIcon = {
  render: ({ ...args }) => {
    return <Input {...args} />;
  },
  args: {
    label: "이메일",
    onChange: handleInputVal,
    icon: <FontAwesomeIcon icon={faEnvelope} size="lg" />,
  },
};

export const WithError = {
  render: ({ ...args }) => {
    return <Input {...args} />;
  },
  args: {
    label: "이메일",
    onChange: handleInputVal,
    status: "error",
    message: "이메일 형식에 알맞게 입력해주세요",
  },
};

export const Disabled = {
  render: ({ ...args }) => {
    return <Input {...args} />;
  },
  args: {
    label: "이메일",
    disabled: true,
  },
};
