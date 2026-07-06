import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "UI/Tag",
  component: Tag,
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => <Tag label="แคลคูลัส" color="#008ACF" backgroundColor="#44ADE280" />,
};

export const Physics: Story = {
  render: () => <Tag label="ฟิสิกส์" color="#9533F0" backgroundColor="#9755D580" />,
};

export const Chemistry: Story = {
  render: () => <Tag label="เคมี" color="#248F53" backgroundColor="#248F5380" />,
};