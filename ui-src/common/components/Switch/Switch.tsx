import classNames from "classnames";
import React from "react";
import styles from "./Switch.module.css";

interface IProps {
  activated: boolean;
  onClick: () => void;
}

export default function Switch({ activated, onClick }: IProps) {
  return (
    <div
      className={classNames(styles.switchContainer, {
        [styles.activated]: activated,
      })}
      onClick={onClick}
    >
      <div className={styles.switchController}></div>
    </div>
  );
}
