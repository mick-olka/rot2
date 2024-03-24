import { Card, CardActionArea, CardContent } from '@mui/material'
import React from 'react'

import s from './card.module.scss'

export const SquareCard = ({
  children,
  height,
}: {
  height?: string
  children: React.ReactNode
}) => {
  return (
    <Card
      className={s.card_pane}
      variant='outlined'
      sx={height ? { height: height + ' !important' } : {}}
    >
      <CardActionArea className={s.action_area}>
        <CardContent className={s.content}>{children}</CardContent>
      </CardActionArea>
    </Card>
  )
}
