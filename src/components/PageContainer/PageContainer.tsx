import { FC, PropsWithChildren } from "react";
import cx from "classnames";
import styles from "./PageContainer.module.css";

type Props = PropsWithChildren & {
  className?: string;
};

const PageContainer: FC<Props> = ({ children, className }) => {
  return <div className={cx(styles.root, className)}>{children}</div>;
};

export default PageContainer;
