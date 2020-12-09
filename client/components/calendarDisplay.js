import React, {useState, useEffect} from 'react'
import CalendarHeatmap from './calendar-heatmap.component'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchOverview, me} from '../store'

export const CalendarView = props => {
  const [dateData, setData] = useState('')
  const [times, setTimes] = useState('')
  const {overview, currentView, user} = props

  useEffect(() => {
    props.me()
    // yearReceived(window.sessionStorage.getItem('CurrentYear'))
  }, [])
  useEffect(
    () => {
      // replace with userId after testing
      props.fetchOverview(user.id)
      console.log(currentView)
    },
    [user]
  )
  useEffect(
    () => {
      setData(window.sessionStorage.getItem(currentView))
    },
    [currentView]
  )

  const findYearData = () => {
    let yearData = overview.filter(day => {
      let sub = day.date.substring(0, 4)
      return sub === dateData
    })
    return yearData
  }

  const findMonthData = () => {
    let monthMap = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12'
    }
    let monthData = overview.filter(day => {
      let sub = day.date.substring(5, 7)
      return sub === monthMap[dateData]
    })
    return monthData
  }

  const findPercentage = () => {
    let total = 0
    let tempData
    if (currentView === 'year') tempData = findYearData()
    if (currentView === 'month') tempData = findMonthData()
    let dailyCompletedGoals = tempData
      .filter(day => day.details[0].mood > 50)
      .map(day => day.details[0].goals.filter(goal => goal.completed === true))
    for (const arr of dailyCompletedGoals) {
      total += arr.length / 3
    }
    return Math.round(total / dailyCompletedGoals.length * 100)
  }

  const findFreqData = () => {
    let finalData = []
    if (currentView === 'year') finalData = findYearData()
    if (currentView === 'month') finalData = findMonthData()
    return finalData.length
  }

  return overview.length > 0 ? (
    <div className="CalendarHeatmapDiv">
      <CalendarHeatmap data={overview} color="#b57edc" overview="year" />
      <br />
      <br />
      <br />
      {currentView !== '' ? (
        <div className="CalOverview">
          <div className="DataOverview">
            <h1>
              In {dateData}, you checked in to Unwind {findFreqData()} times! 🎉
            </h1>
            {findPercentage() ? (
              <h3>
                On your happier days, you completed on average{' '}
                {findPercentage()}% of your daily self care goals.
              </h3>
            ) : null}
          </div>
        </div>
      ) : (
        <img
          src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
          width="200px"
          height="200px"
        />
      )}
    </div>
  ) : (
    <div className="CalendarHeatmap">
      <img
        src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
        width="200px"
        height="200px"
      />
    </div>
  )
}

const mapState = state => {
  console.log(state)
  return {
    overview: state.overview,
    user: state.user,
    currentView: state.currentView
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
    fetchOverview: userId => dispatch(fetchOverview(userId))
  }
}

export const CalendarDisplay = connect(mapState, mapDispatch)(CalendarView)
