import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {me, updateEntry, addEntry, fetchEntry} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DiscreteSlider from './discreteSlider'
import Button from 'react-bootstrap/Button'
import AlertDialog from './submissionAlert'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40rem'
    }
  }
}))

export const DailyEntry = props => {
  const classes = useStyles()
  const [journal, setJournal] = useState('')
  const [compliment, setCompliment] = useState('')
  return (
    <div className="DailyEntryDiv">
      <h3>How did you feel today?</h3>
      <DiscreteSlider />
      <br />
      <form className="entryForm" noValidate autoComplete="off">
        <TextField
          classes={{root: classes.root}}
          id="outlined-basic"
          name="journal"
          label="Write something about your day or anything else you want..."
          variant="outlined"
          onChange={evt => {
            setJournal(evt.target.value)
          }}
        />
        <TextField
          classes={{root: classes.root}}
          id="outlined-basic"
          name="compliment"
          label="Say one nice thing about yourself"
          variant="outlined"
          onChange={evt => setCompliment(evt.target.value)}
        />
        <AlertDialog journal={journal} compliment={compliment} />
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    userId: state.user.id,
    dailyEntry: state.dailyEntry
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
    addEntry: (userId, mood, journal) =>
      dispatch(addEntry(userId, mood, journal)),
    updateEntry: (userId, mood, journal) =>
      dispatch(updateEntry(userId, mood, journal)),
    fetchEntry: entryId => dispatch(fetchEntry(entryId))
  }
}

export default connect(mapState, mapDispatch)(DailyEntry)
