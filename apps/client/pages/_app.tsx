import { Box, LinearProgress, Skeleton } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Roboto_Condensed } from 'next/font/google'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import s from './app.module.scss'
import '@/styles/global.scss'

import { Header, Footer, NavPane } from '@/components'
import { usePageLoading } from '@/hooks'
import { vars } from '@/styles'

import '@/styles/normalize.scss'
import { local_url } from '@/utils'

const roboto = Roboto_Condensed({
  subsets: ['cyrillic-ext', 'latin-ext'],
  weight: ['300', '400', '700'],
  preload: true,
})

export default function App({ Component, pageProps, router }: AppProps) {
  const { isPageLoading } = usePageLoading()
  const url = `${local_url}${router.route}`
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <meta name='description' content='Created by mick-olka' /> */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DefaultSeo
        titleTemplate='Rotang | %s'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url,
          description: 'Rotang.ua',
          site_name: 'Rotang.ua',
          images: [
            {
              url: 'https://rotang.ua/api/upload/С_отражением_на_столе_41648625681377.jpg',
            },
          ],
        }}
        canonical={url}
      />
      <ToastContainer hideProgressBar autoClose={1000} />
      <div className={(s.Wrapper, roboto.className)}>
        {isPageLoading && <LinearProgress sx={{ minHeight: '4px' }} />}
        <Header />
        <div className={s.MainContent}>
          <Box
            component='nav'
            sx={{ width: { sm: 0, md: vars.v.navbarWidth }, flexShrink: { sm: 0 } }}
          >
            <NavPane />
          </Box>
          <Box sx={{ width: '100%' }}>
            <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
              {isPageLoading ? (
                <Skeleton height={'80vh'} width={'100%'} />
              ) : (
                <Component {...pageProps} />
              )}
            </AnimatePresence>
            <Footer />
          </Box>
        </div>
      </div>
    </>
  )
}
