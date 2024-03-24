import { SWRConfig, unstable_serialize } from 'swr'

import { ProductsPage } from '../components/products'

import { getProductsList, getTextById } from '@/hooks'
import { E_Locales, I_ProductsListRes, TextBlocks } from '@/models'
import { E_ApiPaths } from '@/utils/constants'

export async function getStaticProps({ locale }: { locale: E_Locales }) {
  const data: I_ProductsListRes = await getProductsList()
  const tb = await getTextById(TextBlocks.dollar)
  const dollar = tb ? tb.text[locale] : '1'
  const mpt = await getTextById(TextBlocks.main_page_text)
  const main_text = mpt ? mpt.text[locale] : ''
  return {
    props: { fallback: { [E_ApiPaths.products]: data }, locale, text: { dollar, main_text } },
    revalidate: 60,
  }
}

export default function Page({
  fallback,
  locale,
  text,
}: {
  fallback: { [E_ApiPaths.products]: I_ProductsListRes }
  locale: E_Locales
  text: { dollar: string; main_text: string }
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductsPage locale={locale} text={text} />
    </SWRConfig>
  )
}
