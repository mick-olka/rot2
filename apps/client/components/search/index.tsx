import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import s from './search.module.scss'

export const SearchField = ({
  value,
  onChange,
  onSearch,
}: {
  value?: string
  onChange?: (txt: string) => void
  onSearch: (query: string) => void
}) => {
  const [text, setText] = useState(value || '')
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setText(e.target.value)
    onChange && onChange(e.target.value)
  }
  const triggerSearch = () => {
    onSearch(text)
  }
  return (
    <div className={s.pane}>
      <TextField
        value={text}
        onChange={handleChange}
        variant='filled'
        size='small'
        // sx={{ '& input': { fontSize: '1.2rem' } }}
      />
      <IconButton className={s.round_btn} onClick={triggerSearch} sx={{ marginLeft: '0.5rem' }}>
        <SearchOutlinedIcon />
      </IconButton>
    </div>
  )
}
