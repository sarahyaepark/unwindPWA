import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {withStyles} from '@material-ui/core/styles'
import {addEntry} from '../store'
import history from '../history'

export function AlertDialog(props) {
  const [open, setOpen] = React.useState(false)
  const {handleSubmit} = props
  let journal
  let compliment
  if (props.journal !== '') journal = props.journal
  if (props.compliment !== '') compliment = props.compliment

  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7F7FD5 30%, #91EAE4 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(145, 234, 228, .3)'
    },
    label: {
      textTransform: 'capitalize'
    }
  })(Button)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="alertDialog">
      <StyledButton
        size="large"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        I'm done!
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Submit today's entries?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you submit for the night, you can't edit today's info anymore!
            🧚
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Not yet
          </Button>
          <Button
            onClick={evt => handleSubmit(evt, journal, compliment)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, journal, compliment) {
      evt.preventDefault()
      let userId
      if (window.localStorage.getItem('id'))
        userId = window.localStorage.getItem('id')
      else userId = window.sessionStorage.getItem('id')
      let mood = window.sessionStorage.getItem('currentMood')
      if (compliment !== undefined && journal !== undefined) {
        dispatch(addEntry(userId, mood, journal, compliment))
      } else if (compliment !== undefined) {
        dispatch(addEntry(userId, mood, null, compliment))
      } else if (journal !== undefined) {
        dispatch(addEntry(userId, mood, journal))
      } else {
        dispatch(addEntry(userId, mood))
      }
      history.push('/goodnight')
    }
  }
}

export default connect(null, mapDispatch)(AlertDialog)
