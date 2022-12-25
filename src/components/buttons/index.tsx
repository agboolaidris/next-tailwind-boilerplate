import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonstyle = cva("rounded", {
  defaultVariants: {
    variants: "primary",
    size: "sm",
  },
  variants: {
    variants: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "border border-gray-100 hover:bg-gray-100",
    },
    size: {
      sm: "p-2",
      md: "py-2 px-4",
    },
  },
});

type Props = VariantProps<typeof buttonstyle> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  variants,
  size,
  className,
  children,
  ...rest
}: Props) => {
  const style = buttonstyle({ variants, size, className });
  return (
    <button className={style} {...rest}>
      {children}
    </button>
  );
};
