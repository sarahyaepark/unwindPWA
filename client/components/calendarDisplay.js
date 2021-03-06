/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
import CalendarHeatmap from './calendar-heatmap.component'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import {fetchOverview, me} from '../store'
import Feedback from './feedback'
import MobileCalendar from './mobileCalendar'
import CalendarWelcome from './calendarWelcome'

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
      if (Array.isArray(props.overview) && props.overview.length < 1 && user.id)
        props.fetchOverview(user.id)
    },
    [user]
  )

  useEffect(
    () => {
      setData(window.sessionStorage.getItem(currentView))
    },
    [window.sessionStorage.getItem(currentView)]
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
    else if (currentView === 'month') tempData = findMonthData()
    else return null
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
    else if (currentView === 'month') finalData = findMonthData()
    else return null
    return finalData.length
  }
  const [mql, setmql] = useState(true)
  useEffect(
    () => {
      setmql(window.matchMedia('(max-width: 700px)').matches)
    },
    [window.matchMedia('(max-width: 700px)')]
  )

  return !mql ? (
    overview === 'no entries' ? (
      <CalendarWelcome view="desktop" />
    ) : overview.length > 0 ? (
      <div className="CalendarHeatmapDiv">
        <CalendarHeatmap data={overview} color="#91EAE4" overview="year" />
        <br />
        <br />
        <br />
        {currentView !== '' ? (
          <div className="CalOverview">
            {dateData !== '' && dateData !== null ? (
              <div className="DataOverview">
                <h1>
                  In {dateData}, you checked in to Unwind {findFreqData()}{' '}
                  times! 🎉
                </h1>
                {findPercentage() ? (
                  <h3>
                    On your happier days, you completed on average{' '}
                    {findPercentage()}% of your daily self care goals.
                  </h3>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <img
            src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
            width="200px"
            height="200px"
          />
        )}
        <br />
        <Feedback />
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
  ) : (
    <MobileCalendar overview={overview} />
  )
}

const mapState = state => {
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
