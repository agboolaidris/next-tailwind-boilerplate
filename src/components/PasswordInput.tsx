"use client";

import React, { forwardRef, useState } from "react";

import { Input, InputProps } from "./Input";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        {...rest}
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="px-4"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        }
        ref={ref}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
