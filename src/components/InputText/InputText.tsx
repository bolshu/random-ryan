import { FC, ChangeEvent } from "react";
// import cx from "classnames";
import styles from "./InputText.module.css";

export type InputTextProps = {
  id: number;
  onChange: (id: number, value?: string) => void;
  onRemove: (id: number) => void;
  defaultValue?: string;
};

const InputText: FC<InputTextProps> = ({
  id,
  defaultValue,
  onChange,
  onRemove,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

  const handleRemove = () => {
    onRemove(id);
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
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default InputText;
