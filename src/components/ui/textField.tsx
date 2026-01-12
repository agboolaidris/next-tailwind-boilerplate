"use client";
import { cn } from "@lib/utils";
import { CircleAlert } from "lucide-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { Input } from "./input";
import { Typography } from "./typography";
export type TextFieldProps = {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  addon?: React.ReactNode;
  isLoading?: boolean;
  labelClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      addon,
      isLoading,
      labelClassName,
      className,
      ...props
    },
    ref
  ) => {
    const hasRightSlot = rightIcon || isLoading;

    return (
      <div className="group w-full">
        {(label || hint) && (
          <div className="mb-1 flex items-center justify-between">
            {label && (
              <Typography size="sm" as="label" className={labelClassName}>
                {label}
              </Typography>
            )}
            {hint && (
              <Typography size="sm" className="font-semibold">
                {hint}
              </Typography>
            )}
          </div>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </div>
          )}

          <Input
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              leftIcon && "pl-10",
              hasRightSlot && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && !isLoading && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {rightIcon}
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-primary" />
            </div>
          )}
        </div>

        {error && (
          <Typography
            size="sm"
            variant="destructive"
            as="div"
            className="mt-1 flex items-center gap-1 "
          >
            <CircleAlert className="size-4" />
            {error}
          </Typography>
        )}

        {addon && (
          <div className="mt-2 max-h-0 overflow-hidden opacity-0 transition-all duration-200 group-focus-within:max-h-96 group-focus-within:opacity-100">
            {addon}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

const passwordGuide = (
  <div className="space-y-1 text-sm">
    <p className="font-semibold text-foreground">Password requirements</p>
    <ul className="list-disc pl-4">
      <li>1 lowercase letter</li>
      <li>1 uppercase letter</li>
      <li>1 number</li>
      <li>1 special character</li>
      <li>Minimum 6 characters</li>
    </ul>
  </div>
);

const PasswordField = React.forwardRef<
  HTMLInputElement,
  Omit<TextFieldProps, "addon"> & { addon?: boolean }
>(({ addon, ...props }, ref) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <TextField
      ref={ref}
      {...props}
      type={visible ? "text" : "password"}
      addon={addon ? passwordGuide : undefined}
      rightIcon={
        <button
          type="button"
          aria-label="Toggle password visibility"
          onClick={() => setVisible((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
});

PasswordField.displayName = "PasswordField";

export { PasswordField, TextField };
