import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Button from 'react-bootstrap/Button'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
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
          <br /> The purpose of Unwind-ing is so that you can see that each day
          doesn't have to affect the next! Over time, you'll find the self care
          habits that most contribute to your overall mood.
          <br />
          <br /> Use this app to reflect about your day each night. After
          submitting your entry for the day, you can't go back and change them
          so they remain authentic.
          <br />
          <li>
            Input three self care goals that you'd like to accomplish every day
            to show yourself some love.
          </li>
          <li>
            Keep track of the goals you've completed, and journal along the way!
          </li>
          <li>
            Give yourself daily compliments and you'll see them returned to you
            so you can remember the kindness you've given yourself!
          </li>
          <li>
            Complete daily entries to see your calendar in yearly view, and
            click the month to see your monthly view!
          </li>
          <br />
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="info"
        onClick={() => {
          setOpen(true)
        }}
      >
        New Here?
      </Button>
    </div>
  )
}
