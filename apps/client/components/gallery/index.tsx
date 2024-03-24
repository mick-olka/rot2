import Carousel from 'react-gallery-carousel'

import s from './gallery.module.scss'

import 'react-gallery-carousel/dist/index.css'
import { photo_url } from '@/utils'

export const Gallery = ({ photos }: { photos: string[] }) => {
  const images = photos.map((p) => ({
    src: photo_url + p,
    alt: `R`,
    title: p,
  }))
  return (
    <Carousel
      className={s.carousel}
      images={images}
      objectFit={'contain'}
      playIcon={false}
      style={{
        height: '90vw',
        maxHeight: '20rem',
        backgroundColor: 'transparent',
        borderRadius: '0.3rem',
        maxWidth: '85vw',
      }}
      shouldMaximizeOnClick={true}
      shouldMinimizeOnClick={true}
      hasIndexBoard={false}
    />
  )
}
