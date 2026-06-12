import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Shared/UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo({
  showCloseButton = true,
  children,
}: {
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-[8px] bg-primary-red px-4 py-2 text-sm font-bold text-white"
      >
        Open Modal
      </button>
      <Modal open={open} onOpenChange={setOpen} showCloseButton={showCloseButton}>
        {children}
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <ModalDemo>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[#262626]">Modal Title</h2>
        <p className="text-sm text-dark-gray">
          This is the modal body. You can put any content here.
        </p>
      </div>
    </ModalDemo>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalDemo showCloseButton={false}>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[#262626]">No Close Button</h2>
        <p className="text-sm text-dark-gray">Close button is hidden. Click outside to dismiss.</p>
      </div>
    </ModalDemo>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <ModalDemo>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-[#262626]">Long Content Modal</h2>
        {Array.from({ length: 6 }, (_, i) => (
          <p key={i} className="text-sm text-dark-gray">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalDemo>
  ),
};
