import { Box } from '@mui/material'
import { Carousel, CarouselProps } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Photo } from '../photo'

interface I_Props {
  photos: string[]
}

const settings: Partial<CarouselProps> = {
  infiniteLoop: true,
  showStatus: false,
  showThumbs: true,
  showIndicators: false,
}

export const PhotosCarousel = ({ photos }: I_Props) => {
  if (photos.length < 1)
    return (
      <Carousel {...settings}>
        <Box
          sx={{
            width: '500px',
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>No Photos</p>
        </Box>
        <Box
          sx={{
            width: '500px',
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>No Photos</p>
        </Box>
      </Carousel>
    )
  return (
    <Carousel {...settings}>
      {photos.map((p) => (
        <Box key={p} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Photo src={p} sx={{ width: '500px', height: '400px' }} />
        </Box>
      ))}
    </Carousel>
  )
}
