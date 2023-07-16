import classNames from "classnames";
import React, {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { RgbaColor } from "react-colorful";
import { ColorChit } from "../ColorChit";
import styles from "./ColorInput.module.css";
import { HEX_REGEX, OPACITY_REGEX } from "./constants";

interface IProps {
  color: RgbaColor;
  onChange: (selectedColor: RgbaColor) => void;
  onChitClick?: () => void;
  disabled?: boolean;
  hideChit?: boolean;
  className?: string;
}

export default function ColorInput({
  color,
  onChange,
  onChitClick,
  disabled,
  hideChit,
  className,
}: IProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const opacityInputRef = useRef<HTMLInputElement>(null);

  const getHexColor = () => {
    const hexR = color.r.toString(16).padStart(2, "0");
    const hexG = color.g.toString(16).padStart(2, "0");
    const hexB = color.b.toString(16).padStart(2, "0");

    return `${hexR}${hexG}${hexB}`.toUpperCase();
  };

  const getOpacity = () => `${Math.round(color.a * 100)}%`;

  const [colorInputValue, setColorInputValue] = useState(getHexColor());
  const [opacityInputValue, setOpacityInputValue] = useState(getOpacity());

  useEffect(() => {
    setColorInputValue(getHexColor());
    setOpacityInputValue(getOpacity());
  }, [color]);

  useEffect(() => {
    const onKeyDownListener = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          colorInputRef.current?.blur();
          opacityInputRef.current?.blur();
          break;
        default:
          // do nothing
          break;
      }
      event.stopPropagation();
    };

    colorInputRef.current?.addEventListener("keydown", onKeyDownListener);
    opacityInputRef.current?.addEventListener("keydown", onKeyDownListener);

    return () => {
      colorInputRef.current?.removeEventListener("keydown", onKeyDownListener);
      opacityInputRef.current?.removeEventListener(
        "keydown",
        onKeyDownListener
      );
    };
  }, [colorInputValue, colorInputRef, opacityInputRef]);

  const handleColorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value);
  };

  const handleColorInputBlur = () => {
    const isColorValid = HEX_REGEX.test(colorInputValue);

    if (!isColorValid) {
      setColorInputValue(getHexColor());
      return;
    }

    // by how many chars is each rgb component made of
    const parcelLength = colorInputValue.length / 3;

    let rStr = colorInputValue.slice(0, parcelLength);
    let gStr = colorInputValue.slice(parcelLength, parcelLength * 2);
    let bStr = colorInputValue.slice(parcelLength * 2);

    // make it as a 6 length hex
    if (parcelLength === 1) {
      rStr += rStr;
      gStr += gStr;
      bStr += bStr;
    }

    const newColor = {
      ...color,
      r: parseInt(rStr, 16),
      g: parseInt(gStr, 16),
      b: parseInt(bStr, 16),
    };

    onChange(newColor);
  };

  const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpacityInputValue(event.target.value);
  };

  const handleOpacityBlur = () => {
    const isOpacityValue = OPACITY_REGEX.test(opacityInputValue);

    if (!isOpacityValue) {
      setOpacityInputValue(getOpacity());
      return;
    }

    const onlyDigitsOpacityValue = opacityInputValue.includes("%")
      ? opacityInputValue.slice(0, -1)
      : opacityInputValue;

    const newColor = {
      ...color,
      a: parseInt(onlyDigitsOpacityValue) / 100,
    };

    onChange(newColor);
  };

  const handleKeyboardEvent = (
    event: ReactKeyboardEvent<HTMLInputElement>,
    ref: RefObject<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  };

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.disabled]: disabled },
        className
      )}
    >
      {!hideChit && (
        <div className={styles.chitContainer}>
          <ColorChit color={color} onChitClick={onChitClick} />
        </div>
      )}
      <input
        ref={colorInputRef}
        className={styles.colorInput}
        value={colorInputValue}
        onFocus={(e) => e.target.select()}
        onChange={handleColorInputChange}
        onBlur={handleColorInputBlur}
        onKeyDown={(e) => handleKeyboardEvent(e, colorInputRef)}
      />
      <label className={styles.opacityLabel} aria-label="Opacity">
        <input
          ref={opacityInputRef}
          className={styles.opacityInput}
          value={opacityInputValue}
          onFocus={(e) => e.target.select()}
          onChange={handleOpacityChange}
          onBlur={handleOpacityBlur}
          onKeyDown={(e) => handleKeyboardEvent(e, opacityInputRef)}
        />
      </label>
    </div>
  );
}
