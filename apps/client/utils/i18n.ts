import { LocalesObjectT } from '@/models'

const p = (o: LocalesObjectT<string>): LocalesObjectT<string> => {
  return o
}

export const t = {
  currency: p({ ua: '₴', en: '€', de: '€' }),
  sidebar: {
    home: p({ ua: 'Головна', en: 'Home', de: 'Main' }),
    categories: p({ ua: 'Категорії', en: 'Categories', de: 'Categories' }),
    contacts: p({ ua: 'Про нас', en: 'About us', de: 'About us' }),
  },
  header: {
    header_text: p({ ua: 'Меблі з ротангу', en: 'Rotang furniture', de: 'Rotang furniture' }),
  },
  product: {
    order: p({ ua: 'Замовити', en: 'Order', de: 'Order' }),
    ask_us: p({ ua: 'Задайте нам питання!', en: 'Ask us anything!', de: 'Ask us anything!' }),
    color: p({ ua: 'Колір', en: 'Color', de: 'Color' }),
    all: p({ ua: 'Всі', en: 'All', de: 'All' }),
  },
}
