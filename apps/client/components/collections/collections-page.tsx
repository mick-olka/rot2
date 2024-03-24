import { Typography } from '@mui/material'
import Link from 'next/link'

import s from './collections.module.scss'

import { CardsGrid } from '@/components'
import { useGetCollectionsListFallback } from '@/hooks'
import { MainLayout } from '@/layouts'
import { E_Locales } from '@/models'
import { E_ApiPaths } from '@/utils'

const path = E_ApiPaths.collections

export const CollectionsPage = ({ locale }: { locale: E_Locales }) => {
  const { data } = useGetCollectionsListFallback()
  return (
    <MainLayout description='Collections' title='Categories'>
      <CardsGrid
        cardHeight='120px'
        items={data}
        renderItem={(c) => (
          <Link className={s.card_link} href={`${path}${c.url_name}`}>
            <Typography fontFamily='inherit' fontSize='25px'>
              {c.name[locale]}
            </Typography>
          </Link>
        )}
      />
    </MainLayout>
  )
}
