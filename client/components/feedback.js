import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import emailjs from 'emailjs-com'

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  //   const [sug, setSug] = useState('')
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = e => {
    e.preventDefault()
    // convert into env variables
    emailjs
      .sendForm(
        'service_0z0z4el',
        'template_rtd4eti',
        e.target,
        'user_MlshXDjHSMdzfT7ABJGOL'
      )
      .then(
        result => {
          setOpen(false)
        },
        error => {
          console.log(error.text, 'ERROR')
        }
      )
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Suggestions
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Suggestions?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How would you like to see your data displayed? What could we do
            better to help you Unwind a little easier?
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="message"
              name="message"
              label="Suggestion"
              type="text"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="What email should we respond to? (if need be)"
              type="email"
              fullWidth
              required
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleSubmit} color="primary">
            Submit
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}
