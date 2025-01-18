import {
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Dialog,
} from '@mui/material'

import { TransitionProps } from '@mui/material/transitions'

import * as React from 'react'

// import s from './dialogs.module.scss'

interface I_Props {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  text?: string
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const ContentDialog = ({
  children,
  title,
  text,
  open,
  setOpen,
}: // onSubmit,
I_Props) => {
  // const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // const handleSubmit = async () => {
  //   await onSubmit()
  //   setOpen(false)
  // }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '.MuiPaper-root': { maxWidth: 'calc(100% - 64px)' } }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        {/* <Button onClick={handleSubmit}>Submit</Button> */}
      </DialogActions>
    </Dialog>
  )
}
