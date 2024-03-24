'use client'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Autocomplete, Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useDebounce } from 'use-debounce'

import s from './nav-pane.module.scss'

import { Photo } from '../photo'

import { usePaginator, useSearchProductsList } from '@/hooks'
import { getLocaleSafe, lineCut } from '@/utils'

export const Search = () => {
  const [value, setValue] = useState('')
  const [search] = useDebounce(value, 500)
  const products = useSearchProductsList(search)
  const { locale, push } = useRouter()
  const list = products ? products.docs : []
  const handleGo = (id: string) => {
    push('/products/' + id)
  }
  return (
    <Autocomplete
      className={s.search_pane}
      sx={{ margin: '0 5px' }}
      popupIcon={<SearchRoundedIcon />}
      options={list}
      autoHighlight
      getOptionLabel={(option) => option.name[getLocaleSafe(locale || 'ua')]}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
          onClick={() => handleGo(option.url_name)}
        >
          <Photo src={option.thumbnail} sizes='25px 25px' sx={{ width: '50px', height: '50px' }} />
          {lineCut(option.name[getLocaleSafe(locale || 'ua')], 25)}
        </Box>
      )}
      inputValue={value}
      onInputChange={(e, v) => setValue(v)}
      renderInput={(params) => (
        <TextField
          variant='outlined'
          {...params}
          // label='Search'
          size='small'
          inputProps={{
            ...params.inputProps,
            // autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
