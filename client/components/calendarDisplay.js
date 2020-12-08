import React, {useState, useEffect} from 'react'
import CalendarHeatmap from './calendar-heatmap.component'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchOverview, me} from '../store'

export const CalendarView = props => {
  // const [loaded, loading] = useState(false)
  const [data, dataReceived] = useState(false)
  const {overview, user} = props

  useEffect(() => {
    props.me()
  }, [])
  useEffect(
    () => {
      // replace with userId after testing
      props.fetchOverview(user.id)
    },
    [user]
  )

  const print = val => {
    console.log(val)
  }

  return overview.length > 0 ? (
    <CalendarHeatmap
      data={overview}
      color="#b57edc"
      overview="year"
      handler={print}
    />
  ) : (
    <img src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif" />
  )
}

const mapState = state => {
  return {
    overview: state.overview,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
    fetchOverview: userId => dispatch(fetchOverview(userId))
  }
}

export const CalendarDisplay = connect(mapState, mapDispatch)(CalendarView)
