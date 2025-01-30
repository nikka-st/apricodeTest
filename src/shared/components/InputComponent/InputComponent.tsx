import React from "react";
import plus from "../../../assets/icons/plus.svg";
import styles from "./InputComponent.module.scss";

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  func: () => void;
}
export const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  func,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        className={styles.input}
        onChange={onChange}
        placeholder="Описание задачи..."
      />
      <img src={plus} alt="plus" className={styles.itemIcon} onClick={func} />
    </div>
  );
};
