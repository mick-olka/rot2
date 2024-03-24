import MenuIcon from '@mui/icons-material/Menu'
import {
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  Toolbar,
  ListItemButton,
  ListItemText,
  Drawer,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { links } from './data'
import s from './nav-pane.module.scss'

import { Search } from './search'

import { useGetCollectionsList } from '@/hooks'
import Logo from '@/public/logo.svg'

import { v } from '@/styles/variables'
import { getLocaleSafe } from '@/utils'

export const NavPane = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { locale } = useRouter()
  const lan = getLocaleSafe(locale || 'ua')
  const cat = useGetCollectionsList()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar>
        <Link href='/'>
          <Image src={Logo} alt={'Logo'} priority />
        </Link>
      </Toolbar>
      <Search />
      {/* <Divider sx={{ marginTop: '1rem' }} /> */}
      <List>
        {links.map((l) => (
          <Link href={l.path} key={l.path} onClick={() => setMobileOpen(false)}>
            <ListItem disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                <AddRoundedIcon />
              </ListItemIcon> */}
                <ListItemText primary={l.name[lan]} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {cat &&
          cat.map((c) => (
            <Link
              href={'/collections/' + c.url_name}
              key={c.url_name}
              onClick={() => setMobileOpen(false)}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  {/* <ListItemIcon>
                <AddRoundedIcon />
              </ListItemIcon> */}
                  <ListItemText primary={c.name[lan]} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
      <Divider />
    </div>
  )

  return (
    <Box>
      <IconButton
        color='inherit'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ left: '1rem', position: 'absolute', top: '0.8rem', display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        className={s.DrawerStyled}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: v.navbarWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        className={s.DrawerStyled}
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: v.navbarWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
