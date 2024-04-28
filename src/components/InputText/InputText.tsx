import { FC, ChangeEvent } from "react";
// import cx from "classnames";
import styles from "./InputText.module.css";

export type InputTextProps = {
  onChange: (value?: string) => void;
  defaultValue?: string;
};

const InputText: FC<InputTextProps> = ({ defaultValue, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        placeholder="Name of member"
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;
