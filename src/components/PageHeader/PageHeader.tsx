import { FC } from "react";
import PageContainer from "@/components/PageContainer/PageContainer";
import styles from "./PageHeader.module.css";

const PageHeader: FC = () => {
  return (
    <PageContainer className={styles.root}>
      Which one of you is Ryan Gosling?
    </PageContainer>
  );
};

export default PageHeader;
