import React, { ChangeEvent, ReactNode } from "react";

interface CustomTFProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  containerStyle: string;
  textStyle: string;
  startAdornment?: ReactNode;
  size?: "small" | "medium";
  variant?: "filled" | "outlined" | "standard";
}

export function CustomTF({
  containerStyle,
  onChange,
  textStyle,
  value,
  startAdornment,
  size = "small",
  variant = "outlined",
}: CustomTFProps) {}
