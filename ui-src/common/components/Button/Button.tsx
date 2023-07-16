import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

interface IProps {
  children: string;
  onClick: () => void;
  className?: string;

  disabled?: boolean;
}

export default function Button({
  children,
  className,
  onClick,
  disabled,
}: IProps) {
  return (
    <button
      className={classNames(className, styles.button, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
