import React, { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface IProps {
  type?: "text" | "number";
  step?: number;
  min?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

export default function Input({
  type = "text",
  step = 1,
  min = 1,
  value,
  onChange,
  onBlur,
}: IProps) {
  return (
    <input
      className={styles.pageInput}
      type={type}
      step={step}
      min={min}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
