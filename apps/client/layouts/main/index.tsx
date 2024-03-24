import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import React from 'react'

import s from './mainLayout.module.scss'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export const MainLayout = ({ children, title, description }: LayoutProps) => {
  return (
    <main className={s.MainPane}>
      <NextSeo title={title} description={description} />
      <motion.main
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        transition={{ type: 'linear' }}
      >
        {children}
      </motion.main>
    </main>
  )
}
