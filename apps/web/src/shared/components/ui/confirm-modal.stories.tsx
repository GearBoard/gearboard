import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ConfirmModal } from "./confirm-modal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Shared/UI/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

function ConfirmModalDemo({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-[8px] bg-primary-red px-4 py-2 text-sm font-bold text-white"
      >
        Delete Post
      </button>
      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => setOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <ConfirmModalDemo />,
};

export const Loading: Story = {
  render: () => <ConfirmModalDemo isLoading />,
};
