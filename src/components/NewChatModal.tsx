"use client";

import { useEffect, useRef, useState } from "react";

type NewChatModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
};

export function NewChatModal({ open, onClose, onConfirm }: NewChatModalProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  function handleConfirm() {
    onConfirm(value.trim());
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex animate-modal-in items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm animate-modal-pop rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <h2 className="font-display text-xl italic text-foreground">
          Название промта
        </h2>
        <p className="mt-1 text-sm text-muted">
          Как назвать новый чат? Это имя появится в истории.
        </p>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          placeholder="Например, «Погоня в дожде»"
          className="mt-4 w-full rounded-lg border border-border bg-background-elevated px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-surface-hover hover:text-foreground"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition hover:brightness-110"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}
