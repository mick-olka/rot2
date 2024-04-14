import { SWRConfig, unstable_serialize } from "swr";

import { ProductsPage } from "../components/products";

import { getProductsList, getTextById } from "@/hooks";
import { E_Locales, I_ProductsListRes, TextBlocks } from "@/models";
import { E_ApiPaths } from "@/utils/constants";

export async function getStaticProps({ locale }: { locale: E_Locales }) {
  const data: I_ProductsListRes = await getProductsList();
  const tb = await getTextById(TextBlocks.dollar);
  const dollar = tb ? tb.text[locale] : "1";
  const mpt = await getTextById(TextBlocks.main_page_text);
  const d = await getTextById(TextBlocks.main_description);
  const description = d?.text[locale] || "";
  const t = await getTextById(TextBlocks.tab_title);
  const title = t?.text[locale];
  const main_text = mpt ? mpt.text[locale] : "";
  const bt = await getTextById(TextBlocks.bottom_text);
  const bottom_text = bt?.text[locale];
  return {
    props: {
      fallback: { [E_ApiPaths.products]: data },
      locale,
      text: { dollar, main_text, description, title, bottom_text },
    },
    revalidate: 60,
  };
}

export default function Page({
  fallback,
  locale,
  text,
}: {
  fallback: { [E_ApiPaths.products]: I_ProductsListRes };
  locale: E_Locales;
  text: {
    dollar: string;
    main_text: string;
    description: string;
    title: string;
    bottom_text: string;
  };
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductsPage locale={locale} text={text} />
    </SWRConfig>
  );
}
