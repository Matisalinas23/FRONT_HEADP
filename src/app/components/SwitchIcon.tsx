import React, { useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function SwitchIcon({ isReceipt, setIsReceipt }: { isReceipt: boolean, setIsReceipt: (boolean: boolean) => void}) {

  return (
    <button className="flex items-center justify-center cursor-pointer" onClick={() => setIsReceipt(!isReceipt)}>
      {isReceipt ? (
        <ToggleRight className="w-8 h-8 text-[var(--darkgreen)]" />
      ) : (
        <ToggleLeft className="w-8 h-8 text-[var(--lightgray)]" />
      )}
    </button>
  );
};