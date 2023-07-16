import React from "react";
import { RgbaColor } from "react-colorful";
import styles from "./ColorChit.module.css";

interface IProps {
  color: RgbaColor;
  onChitClick?: () => void;
}

export default function ColorChit({ color, onChitClick }: IProps) {
  return (
    <div
      className={styles.chit}
      tabIndex={0}
      style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
      onClick={onChitClick}
    >
      <div className={styles.chitAlpha} style={{ opacity: 1 - color.a }}></div>
    </div>
  );
}
