"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

const buttonStyle = cva(
  "rounded-lg font-medium  gap-2 flex justify-center items-center w-max transition-all duration-150  text-sm  disabled:opacity-70",
  {
    defaultVariants: {
      block: false,
      kinds: "primary",
      rounded: false,
      size: "md",
    },
    variants: {
      block: { true: "!w-full" },
      kinds: {
        normal: "border-none pl-0 hover:opacity-70",
        primary: "bg-brand-blue text-white hover:bg-opacity-80 shadow-sm",
        secondary: "border border-gray-300 hover:opacity-70",
      },
      rounded: {
        true: "!rounded-full",
      },
      size: {
        lg: "px-3.5 py-2.5",
        md: "px-4 py-3",
        sm: "px-2.5 py-3",
      },
    },
  }
);

type Props = VariantProps<typeof buttonStyle> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    children: ReactNode;
  };

export function Button({
  className,
  children,
  size,
  kinds,
  block,
  isLoading,
  rounded,
  ...props
}: Props) {
  return (
    <button
      className={cx(buttonStyle({ block, kinds, rounded, size }), className)}
      {...props}
    >
      {isLoading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-white" />
      )}
      {children}
    </button>
  );
}
