import React, {useState, useEffect} from 'react'
import CalendarHeatmap from './calendar-heatmap.component'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchOverview} from '../store/overview'

export const CalendarView = props => {
  // const [loaded, loading] = useState(false)
  const [data, dataReceived] = useState(false)
  const {overview} = props

  useEffect(() => {
    // replace with userId after testing
    props.fetchOverview(1)
    // loading(true)
  }, [])
  useEffect(() => {
    // replace with userId after testing
    // if (loaded) {
    dataReceived(overview)
    console.log('>>>>>>>>', overview)
    // }
  }, [])

  const print = val => {
    console.log(val)
  }

  return data.length > 0 ? (
    <CalendarHeatmap
      data={data}
      color="#b57edc"
      overview="month"
      handler={print}
    />
  ) : (
    <img src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif" />
  )
}

const mapState = state => {
  console.log(state)
  return {
    overview: state.overview
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOverview: userId => dispatch(fetchOverview(userId))
  }
}

export const CalendarDisplay = connect(mapState, mapDispatch)(CalendarView)
