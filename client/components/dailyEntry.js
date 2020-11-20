import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {me, updateEntry, addEntry, fetchEntry} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DiscreteSlider from './discreteSlider'
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40rem'
    }
  }
}))

export const DailyEntry = () => {
  const classes = useStyles()
  const handleSubmit = evt => {
    evt.preventDefault()
  }
  return (
    <div className="DailyEntryDiv">
      <h3>How did you feel today?</h3>
      <DiscreteSlider />
      <br />
      <form
        className="entryForm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          classes={{root: classes.root}}
          id="outlined-basic"
          label="Write something about your day or anything else you want..."
          variant="outlined"
        />
        <TextField
          classes={{root: classes.root}}
          id="outlined-basic"
          label="Say one nice thing about yourself"
          variant="outlined"
        />
        <Button type="submit" variant="outline-primary">
          Submit
        </Button>
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
