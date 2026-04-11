"use client";

import { useEffect, useRef, useState } from "react";

import { DealSubmitForm } from "./DealSubmitForm";

export function DealModal() {
  const [open, setOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        + Add Deal
      </button>

      {/* Overlay */}
      {open && (
        <div
          ref={backdropRef}
          onClick={(e) => { if (e.target === backdropRef.current) setOpen(false); }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md hover:text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>

            <DealSubmitForm onSubmitSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
