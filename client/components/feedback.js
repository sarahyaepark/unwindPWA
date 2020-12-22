import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import emailjs from 'emailjs-com'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  //   const [sug, setSug] = useState('')
  const notify = () =>
    toast.success('🦄 Suggestion Sent. Thanks!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      process.env.REACT_APP_EMAIL_USER_ID
    )
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_USER_ID
      )
      .then(
        result => {
          notify()
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
      <ToastContainer />
    </div>
  )
}
