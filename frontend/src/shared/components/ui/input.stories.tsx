import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search } from "lucide-react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Shared/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    type: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "ค้นหาวิชา, อาจารย์ หรือข้อสอบ",
    icon: <Search />,
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "ค้นหาวิชา, อาจารย์ หรือข้อสอบ",
    icon: <Search />,
    error: true,
  },
};

export const DisabledState: Story = {
  args: {
    placeholder: "ค้นหาวิชา, อาจารย์ หรือข้อสอบ",
    icon: <Search />,
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Email",
    id: "email",
  },
};

export const WithLabelAndError: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Email",
    id: "email-error",
    errorMessage: "Please enter a valid email address.",
  },
};

export const WithLabelRequired: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Email",
    id: "email-required",
    required: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-[500px] bg-bg-white rounded-xl">
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">Default (No Icon)</span>
        <Input placeholder="Enter text..." />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">With Icon (Search)</span>
        <Input placeholder="ค้นหาวิชา, อาจารย์ หรือข้อสอบ" icon={<Search />} />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">Error State</span>
        <Input placeholder="ค้นหาวิชา, อาจารย์ หรือข้อสอบ" icon={<Search />} error />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">Disabled State</span>
        <Input placeholder="ค้นหาวิชา, อาจารย์ หรือข้อสอบ" icon={<Search />} disabled />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">With Label</span>
        <Input placeholder="Enter your email" label="Email" id="story-email" />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">With Label + Error</span>
        <Input
          placeholder="Enter your email"
          label="Email"
          id="story-email-err"
          errorMessage="Please enter a valid email address."
        />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">
          With Label + Required
        </span>
        <Input placeholder="Enter your email" label="Email" id="story-email-req" required />
      </div>
      <div>
        <span className="text-xs font-bold text-primary-navy mb-2 block">
          With Label + Required + Error
        </span>
        <Input
          placeholder="Enter your email"
          label="Email"
          id="story-email-req-err"
          required
          errorMessage="Please enter a valid email address."
        />
      </div>
    </div>
  ),
};
