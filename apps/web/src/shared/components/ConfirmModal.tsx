"use client";

import * as React from "react";
import { Modal } from "@/shared/components/ui/modal";
import { Button } from "@/shared/components/ui/button";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  function handleCancel() {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isLoading && !nextOpen) return;
    onOpenChange(nextOpen);
  }

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="text-sm text-dark-gray">{message}</p>
        </div>
        <div className="flex justify-end gap-3">
          <Button color="red" onClick={onConfirm} loading={isLoading}>
            {confirmLabel}
          </Button>
          <Button color="gray" onClick={handleCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
