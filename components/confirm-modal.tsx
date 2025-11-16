"use client";

import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl max-w-sm w-full border border-border-light">
        <h2 className="text-xl font-bold mb-3 text-text">{title}</h2>
        <p className="text-text-muted mb-6">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border border-border-light"
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
