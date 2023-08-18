import { useState } from "react";
import Pagination from "./Pagination";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    totalPage: { control: { type: "range", min: 1, max: 30, step: 1 } },
    nowPage: { control: { type: "range", min: 1, max: 30, step: 1 } },
    limit: { control: { type: "range", min: 1, max: 30, step: 1 } },
    shape: {
      control: "radio",
      options: ["pill", "brick"],
    },
    weight: {
      control: "radio",
      options: ["ghost", "solid", "outlined"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "relative"],
      handlePage: {},
    },
    space: {
      control: "radio",
      options: ["divided", "cozy", "comfy"],
    },
  },
};

export default meta;

export const Default = {
  render: ({ ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(1);

    const handlePage = (newPage) => {
      action("onClick")(`newPage -> ${newPage}`);
      setPage(newPage);
    };

    return <Pagination {...args} nowPage={page} handlePage={handlePage} />;
  },
};

Default.args = {
  weight: "solid",
  totalPage: 24,
};

export const WeightGhost = {
  render: ({ ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(1);

    const handlePage = (newPage) => {
      action("onClick")(`newPage -> ${newPage}`);
      setPage(newPage);
    };

    return <Pagination {...args} nowPage={page} handlePage={handlePage} />;
  },
};

WeightGhost.args = {
  weight: "ghost",
  totalPage: 24,
};
