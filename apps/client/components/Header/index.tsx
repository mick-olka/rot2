import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded'
import { IconButton, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

import s from './header.module.scss'

import { LocalesSelector } from './locales-selector'

import { useGetTextByName } from '@/hooks'
import { TextBlocks } from '@/models'
import Logo from '@/public/logo.svg'
import { phones } from '@/utils'

export const Header = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const ht = useGetTextByName(TextBlocks.header_text)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttons = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      <IconButton
        sx={{ bgcolor: '#ddd' }}
        id='phone-btn'
        aria-controls={open ? 'phones-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PhoneInTalkRoundedIcon color='action' />
      </IconButton>
      <LocalesSelector />
    </div>
  )

  return (
    <header className={s.Header}>
      <div className={s.LogoLinksNavigateWrapper} style={{ width: matches ? 'auto' : '100%' }}>
        <Link href={'/'}>
          <Image src={Logo} alt={'Logo'} priority width={120} />
        </Link>
        {!matches && buttons}
      </div>
      <div className={s.HeaderContentCenter} style={{ maxWidth: matches ? '50%' : '100%' }}>
        <p>{ht || ''}</p>
      </div>
      {matches && buttons}
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
        <div style={{ padding: '10px', textAlign: 'center', fontWeight: '600' }}>09:00 - 20:00</div>
        {phones.map((p) => (
          <MenuItem key={p.label} style={{ textDecoration: 'underline' }}>
            <a href={p.link}>
              <Typography fontSize='20px'>{p.label}</Typography>
            </a>
          </MenuItem>
        ))}
      </Menu>
    </header>
  )
}
