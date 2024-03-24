import { ProductsList } from '../products'

import { useGetCollectionById } from '@/hooks'
import { MainLayout } from '@/layouts'
import { E_Locales } from '@/models'

export const CollectionPage = ({
  id,
  locale,
  text,
}: {
  id: string
  locale: E_Locales
  text: { dollar: string }
}) => {
  const { data } = useGetCollectionById(id)
  return (
    <MainLayout title={data.name.ua} description={data.description[locale]}>
      <h1 style={{ textAlign: 'center' }}>{data.name.ua}</h1>
      <ProductsList list={data.items} locale={locale} text={text} />
    </MainLayout>
  )
}
