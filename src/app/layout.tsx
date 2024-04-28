import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import PageContainer from "@/components/PageContainer/PageContainer";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageFooter from "@/components/PageFooter/PageFooter";
import styles from "./layout.module.css";

import "./globals.css";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${styles.root} ${archivo.className}`}>
        <header>
          <PageHeader />
        </header>
        <main className={styles.main}>
          <PageContainer> {children}</PageContainer>
        </main>
        <footer className={styles.footer}>
          <PageFooter />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
