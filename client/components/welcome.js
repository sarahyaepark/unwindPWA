import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& > * + *': {
      //   marginTop: theme.spacing(2),
      //   marginLeft: theme.spacing(2),
    }
  }
}))

export default function TransitionAlerts() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          // variant="outlined"
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Let's Unwind together! 🌙
          <br /> Use this app to Unwind and reflect about your day each night.
          After submitting your entry for the day, you can't go back and change
          them! Be authentic with yourself.
          <br />
          Input three self care goals that you'd like to accomplish every day to
          show yourself some love.
          <br /> Keep track of the goals you've completed, and journal along the
          way!
          <br />
          Give yourself daily compliments and you'll see them returned to you so
          you can remember the kindness you've given yourself!
          <br />
          Complete daily entries to see your calendar in yearly view, and click
          the month to see your monthly view!
          <br />
          Let's prioritize loving yourself. 💖
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outline-info"
        onClick={() => {
          setOpen(true)
        }}
      >
        New Here?
      </Button>
    </div>
  )
}
