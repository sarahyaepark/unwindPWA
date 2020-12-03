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
    let now = moment()
      .endOf('day')
      .toDate()
    let time_ago = moment()
      .startOf('day')
      .subtract(10, 'year')
      .toDate()
    let dummy = d3.timeDays(time_ago, now).map(function(dateElement, index) {
      return {
        date: dateElement,
        details: Array.apply(
          null,
          new Array(Math.floor(Math.random() * 15))
        ).map(function(e, i, arr) {
          return {
            name: 'Project',
            // 'date': function() {
            //   let projectDate = new Date(dateElement.getTime())
            //   projectDate.setHours(Math.floor(Math.random() *24))
            //   projectDate.setMinutes(Math.floor(Math.random()*60))
            //   return projectDate
            // }(),
            value: 50
          }
        }),
        init: function() {
          this.total = this.details.reduce(function(prev, e) {
            return prev + e.value
          }, 0)
          return this
        }
      }.init()
    })
    dataReceived(dummy)
  }, [])
  // useEffect(() => {
  //   // replace with userId after testing
  //   // if (loaded) {
  //   dataReceived(overview)
  //   console.log('>>>>>>>>', overview)
  //   // }
  // }, [])

  const print = val => {
    console.log(val)
  }

  return overview.length > 0 ? (
    <CalendarHeatmap
      data={overview}
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
