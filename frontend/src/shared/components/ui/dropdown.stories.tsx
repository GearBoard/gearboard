import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Dropdown } from "./dropdown";

const OPTIONS = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Shared/UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-56 w-64 items-start p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

function SingleDefaultDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <Dropdown options={OPTIONS} value={value} onChange={setValue} />;
}

function SingleWithSelectionDemo() {
  const [value, setValue] = useState("1");
  return <Dropdown options={OPTIONS} value={value} onChange={setValue} />;
}

function MultiDefaultDemo() {
  const [values, setValues] = useState<string[]>([]);
  return <Dropdown multiple options={OPTIONS} values={values} onChange={setValues} />;
}

function MultiWithSelectionDemo() {
  const [values, setValues] = useState(["1", "3"]);
  return <Dropdown multiple options={OPTIONS} values={values} onChange={setValues} />;
}

function WithLabelDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <Dropdown options={OPTIONS} value={value} onChange={setValue} label="Category" />;
}

function WithLabelAndErrorDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Dropdown
      options={OPTIONS}
      value={value}
      onChange={setValue}
      label="Category"
      errorMessage="Please select a category."
    />
  );
}

function WithLabelRequiredDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <Dropdown options={OPTIONS} value={value} onChange={setValue} label="Category" required />;
}

function AllVariantsDemo() {
  const [single, setSingle] = useState<string | undefined>(undefined);
  const [multi, setMulti] = useState<string[]>([]);

  return (
    <div className="flex w-full gap-8 p-6">
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">Single-Dropdown</span>
        <Dropdown options={OPTIONS} value={single} onChange={setSingle} />
      </div>
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">Multi-Dropdown</span>
        <Dropdown multiple options={OPTIONS} values={multi} onChange={setMulti} />
      </div>
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">With Label</span>
        <Dropdown options={OPTIONS} value={single} onChange={setSingle} label="Category" />
      </div>
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">With Label + Error</span>
        <Dropdown
          options={OPTIONS}
          value={single}
          onChange={setSingle}
          label="Category"
          errorMessage="Please select a category."
        />
      </div>
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">With Label + Required</span>
        <Dropdown options={OPTIONS} value={single} onChange={setSingle} label="Category" required />
      </div>
      <div className="flex w-56 flex-col gap-2">
        <span className="text-xs text-gray-400">With Label + Required + Error</span>
        <Dropdown
          options={OPTIONS}
          value={single}
          onChange={setSingle}
          label="Category"
          required
          errorMessage="Please select a category."
        />
      </div>
    </div>
  );
}

export const SingleDefault: Story = {
  render: () => <SingleDefaultDemo />,
};

export const SingleWithSelection: Story = {
  render: () => <SingleWithSelectionDemo />,
};

export const MultiDefault: Story = {
  render: () => <MultiDefaultDemo />,
};

export const MultiWithSelection: Story = {
  render: () => <MultiWithSelectionDemo />,
};

export const WithLabel: Story = {
  render: () => <WithLabelDemo />,
};

export const WithLabelAndError: Story = {
  render: () => <WithLabelAndErrorDemo />,
};

export const WithLabelRequired: Story = {
  render: () => <WithLabelRequiredDemo />,
};

export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
};
