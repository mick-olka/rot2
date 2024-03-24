import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import parse from 'html-react-parser'

import { useMemo, useState } from 'react'

import { Gallery } from '../gallery'

import { useGetProductById } from '@/hooks'
import { MainLayout } from '@/layouts'
import { E_Locales } from '@/models'
import { phones, t } from '@/utils'

export const ProductPage = ({
  id,
  locale,
  text,
}: {
  id: string
  locale: E_Locales
  text: { order: string; dollar: string; collection: null | { id: string; name: string } }
}) => {
  const { data } = useGetProductById(id)
  const d = Number(text.dollar)
  const [color, setColor] = useState('0')
  const colors_list = data.photos.map((p) => ({
    id: p._id,
    label: `${p.main_color[locale]}${
      p.pill_color[locale] ? ' - ' + p.pill_color[locale] : ' - Без текстилю'
    }`,
  }))
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value)
  }
  const all_photos = useMemo(() => {
    let all: string[] = []
    data.photos.forEach((p) => {
      if (color === '0' || color === p._id) all = all.concat(p.path_arr)
    })
    return all
  }, [data, color])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const l = t.product
  return (
    <MainLayout title={data.name[locale]} description={data.description[locale]}>
      <Card sx={{ position: 'relative', maxWidth: '99vw' }}>
        <Grid container spacing={1} alignContent={'center'}>
          <Grid item lg={6} justifyContent={'center'}>
            <Box sx={{ maxWidth: '100%', padding: '1rem', paddingBottom: 0 }}>
              <Breadcrumbs
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '15px',
                  // '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
                }}
              >
                <Link underline='always' color='inherit' href={'/'}>
                  Rotang
                </Link>
                {text.collection && (
                  <Link
                    underline='always'
                    color='inherit'
                    href={'/collections/' + text.collection.id}
                  >
                    {text.collection.name}
                  </Link>
                )}
                <Typography color='text.primary' sx={{ fontSize: '15px' }}>
                  {data.name[locale]}
                </Typography>
              </Breadcrumbs>
              <Gallery photos={all_photos} />
            </Box>
          </Grid>
          <Grid item lg={6} justifyContent={'center'}>
            <Box>
              <Typography
                textAlign='center'
                textTransform='uppercase'
                color='#888'
                fontWeight='400'
                fontSize='22px'
                fontFamily='inherit'
                textOverflow='ellipsis'
                overflow='hidden'
                padding='1rem'
                maxWidth='90vw'
              >
                {data.name[locale]}
              </Typography>
              <Box sx={{ padding: '1rem' }}>
                <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <FormControl sx={{ minWidth: '200px', flexGrow: 1 }} size='small'>
                    <InputLabel id='select-color'>{l.color[locale]}</InputLabel>
                    <Select
                      labelId='select-color'
                      value={color}
                      label={l.color[locale]}
                      onChange={handleChange}
                    >
                      <MenuItem value={'0'}>{l.all[locale]}</MenuItem>
                      {colors_list.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant='contained'
                    color='info'
                    id='phone-btn'
                    aria-controls={open ? 'phones-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ flexGrow: 1, maxWidth: '400px' }}
                  >
                    <PhoneInTalkRoundedIcon />
                    <Typography marginLeft='10px' fontFamily='inherit'>
                      {text.order || l.order[locale]}
                    </Typography>
                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: '-1.5rem',
                        right: 1,
                        fontSize: '16px',
                        color: '#000',
                        textTransform: 'none',
                      }}
                    >
                      {l.ask_us[locale]}
                    </Typography>
                  </Button>
                  <Menu
                    id='phones-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'phone-btn',
                    }}
                    sx={{ top: '5px' }}
                  >
                    <div style={{ padding: '10px', textAlign: 'center', fontWeight: '600' }}>
                      09:00 - 20:00
                    </div>
                    {phones.map((p) => (
                      <MenuItem key={p.label} style={{ textDecoration: 'underline' }}>
                        <a href={p.link}>{p.label}</a>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ marginTop: '1rem', display: 'flex' }}>
                  <Typography fontSize='25px' fontFamily='inherit'>
                    {data.price * d}
                  </Typography>
                  <Typography fontSize='25px' marginLeft='5px' color='#888'>
                    {t.currency[locale]}
                  </Typography>
                </Box>
                <Box sx={{ padding: '1rem 0', fontSize: '18px', lineHeight: '25px' }}>
                  {/* <p dangerouslySetInnerHTML={{ __html: data.description[locale] }}></p> */}
                  {parse(data.description[locale])}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box sx={{ padding: '1rem' }}>
              {data.features[locale].map((f) => (
                <Box
                  key={f.key}
                  sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
                >
                  <Typography fontFamily='inherit' fontWeight={600} fontSize='19px'>
                    {f.key}:
                  </Typography>
                  <Typography
                    fontFamily='inherit'
                    textAlign={'right'}
                    fontSize='19px'
                    marginLeft='auto'
                  >
                    {f.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </MainLayout>
  )
}
