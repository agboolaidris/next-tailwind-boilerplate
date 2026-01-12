import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("m-0 p-0", {
  variants: {
    size: {
      xs: "text-xs leading-tight",
      sm: "text-sm leading-snug",
      base: "text-base leading-normal",
      lg: "text-lg leading-normal",
      xl: "text-xl leading-relaxed",
      "2xl": "text-2xl leading-relaxed",
      "3xl": "text-3xl leading-loose",
      "4xl": "text-4xl leading-loose",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    variant: "default",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType; // ✅ Fix TS error
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = "p",
  className,
  size = "base",
  weight = "normal",
  variant = "default",
  ...props
}) => {
  return (
    <Component
      className={`${typographyVariants({ size, weight, variant })} ${
        className || ""
      }`}
      {...props}
    />
  );
};
