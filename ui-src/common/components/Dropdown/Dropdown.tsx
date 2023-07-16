import React, { useRef, useState } from "react";
import { ReactComponent as CheckIcon } from "../../assets/icon-16-check.svg";
import { ReactComponent as ChevronIcon } from "../../assets/icon-8-chevron.svg";
import useClickOutside from "../../hooks/useClickOutside";
import styles from "./Dropdown.module.css";
import { DropdownOption } from "./types";

interface IProps<T> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
}

export default function Dropdown<T>({ value, options, onChange }: IProps<T>) {
  const dropdownOptionsContainerRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useClickOutside(dropdownOptionsContainerRef, () => setDropdownOpen(false));

  const getLabel = () => {
    const selectedOption = options.find((o) => o.value === value);
    if (!selectedOption) {
      throw new Error(`couldn't find the value ${value} inside options list`);
    }
    return selectedOption.label;
  };

  const onOptionClick = (value: T) => {
    setDropdownOpen(false);
    onChange(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input} onClick={() => setDropdownOpen(true)}>
        <span className={styles.inputText}>{getLabel()}</span>
        <span className={styles.chevronContainer}>
          <ChevronIcon />
        </span>
      </div>
      {isDropdownOpen && (
        <div
          ref={dropdownOptionsContainerRef}
          className={styles.dropdownOptionsContainer}
        >
          <div className={styles.menu}>
            {options.map((option) => (
              <div
                className={styles.menuItem}
                onClick={() => onOptionClick(option.value)}
              >
                <span className={styles.checkContainer}>
                  {option.value === value && <CheckIcon />}
                </span>
                <span className={styles.label}>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
