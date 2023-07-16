import classNames from "classnames";
import React, { ElementType } from "react";
import styles from "./IconButton.module.css";

interface IProps {
  Icon: ElementType;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export default function IconButton({
  Icon,
  onClick,
  disabled,
  selected,
}: IProps) {
  const handleClick = () => {
    if (selected || disabled) {
      // we don't want to trigger an event in this case
      return;
    }

    onClick();
  };

  return (
    <button
      className={classNames(styles.button, {
        [styles.disabled]: disabled,
        [styles.selected]: selected,
      })}
      onClick={handleClick}
    >
      <Icon className={styles.icon} />
    </button>
  );
}
