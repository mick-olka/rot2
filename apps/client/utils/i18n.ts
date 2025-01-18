import { LocalesObjectT } from "@/models";

const p = (o: LocalesObjectT<string>): LocalesObjectT<string> => {
  return o;
};

export const t = {
  currency: p({ ua: "₴", en: "€", de: "€" }),
  sidebar: {
    home: p({ ua: "Головна", en: "Home", de: "Startseite" }),
    categories: p({ ua: "Категорії", en: "Categories", de: "Kategorien" }),
    contacts: p({ ua: "Про нас", en: "About us", de: "Über uns" }),
  },
  header: {
    header_text: p({
      ua: "Меблі з ротангу",
      en: "Rotang furniture",
      de: "Rattanmöbel",
    }),
  },
  product: {
    order: p({ ua: "Замовити", en: "Order", de: "Bestellen" }),
    ask_us: p({
      ua: "Задайте нам питання!",
      en: "Ask us anything!",
      de: "Fragen Sie uns etwas!",
    }),
    color: p({ ua: "Колір", en: "Color", de: "Farbe" }),
    all: p({ ua: "Всі", en: "All", de: "Alle" }),
  },
};
