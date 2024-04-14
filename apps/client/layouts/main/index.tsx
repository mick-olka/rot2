import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import s from "./main-layout.module.scss";

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const MainLayout = ({ children, title, description }: LayoutProps) => {
  return (
    <main className={s.MainPane}>
      <NextSeo title={title} description={description} />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
      >
        {children as any}
      </motion.main>
    </main>
  );
};
