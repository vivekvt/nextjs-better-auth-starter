"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
}

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      value = "",
      onChange,
      length = 6,
      autoFocus = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, digit: string) => {
      if (!/^\d?$/.test(digit)) return;

      const newValue = value.split("");
      newValue[index] = digit;
      const result = newValue.join("");

      onChange?.(result);

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      // Handle backspace
      if (e.key === "Backspace") {
        if (!value[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else {
          const newValue = value.split("");
          newValue[index] = "";
          onChange?.(newValue.join(""));
        }
      }
      // Handle arrow keys
      else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").slice(0, length);
      if (/^\d+$/.test(pastedData)) {
        onChange?.(pastedData);
        // Focus the next empty slot or the last slot
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      }
    };

    React.useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);

    return (
      <div className="flex justify-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
              if (index === 0 && ref) {
                if (typeof ref === "function") ref(el);
                else ref.current = el;
              }
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(-1)}
            className={cn(
              "border-input bg-background text-foreground h-14 w-12 rounded-xl border text-center text-lg font-semibold transition-all",
              "focus:border-primary focus:ring-primary/20 focus:ring-2 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              activeIndex === index && "ring-primary/20 border-primary ring-2",
              value[index] && "border-primary/50 bg-primary/5",
              className,
            )}
            {...props}
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = "OTPInput";

export { OTPInput };
