import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonstyle = cva("rounded p-4", {
  variants: {
    kind: {
      primary: "",
    },
  },
});

type Props = VariantProps<typeof buttonstyle> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ kind, className, children, ...props }: Props) => {
  const style = buttonstyle({ kind, className });
  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
};
