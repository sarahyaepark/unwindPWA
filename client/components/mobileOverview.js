import React, {useState, useEffect} from 'react'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import CheckIcon from '@material-ui/icons/Check'

const MobileOverview = props => {
  const {activeDate, overview, view} = props
  const [frequency, setFrequency] = useState('')
  const [month, setMonth] = useState('')
  const [monthData, setMonthData] = useState('')
  const [percentage, setPercentage] = useState('')
  const [favoriteGoals, setFavoriteGoals] = useState('')
  const findPercentage = tempMonthData => {
    let total = 0
    let dailyCompletedGoals = tempMonthData
      .filter(day => day.total > 50)
      .map(day => day.details[0].goals.filter(goal => goal.completed === true))
    for (const arr of dailyCompletedGoals) {
      total += arr.length / 3
    }
    return Math.round(total / dailyCompletedGoals.length * 100)
  }

  const findFavoriteGoals = tempMonthData => {
    let uniqueGoalsMap = {}
    let uniqueGoals = []
    let sortedUniqueGoals = []
    tempMonthData.map(data => {
      data.details[0].goals.map(goal => {
        if (goal.completed) {
          if (uniqueGoalsMap[goal.description] !== undefined) {
            uniqueGoalsMap[goal.description]++
          } else {
            uniqueGoalsMap[goal.description] = 1
            uniqueGoals.push(goal.description)
          }
        }
      })
    })
    for (const key of uniqueGoals) {
      let tempObj = {
        description: key,
        freq: uniqueGoalsMap[key]
      }
      sortedUniqueGoals.push(tempObj)
    }
    sortedUniqueGoals.sort((a, b) => b.freq - a.freq)
    return sortedUniqueGoals
  }

  const getMonthlyOverview = () => {
    let currentMonth = moment(view).format('MM') + ''
    let tempMonthData = overview.filter(data => {
      let tempData = data.date.split('-')
      return currentMonth === tempData[1]
    })
    setMonthData(tempMonthData)
    setFrequency(tempMonthData.length)
    setPercentage(findPercentage(tempMonthData))
    setFavoriteGoals(findFavoriteGoals(tempMonthData))
  }

  useEffect(
    () => {
      setMonth(moment(view).format('MMMM'))
      getMonthlyOverview()
    },
    [view]
  )

  return frequency ? (
    <div className="mobileOverview">
      <h3>
        In {month} you checked in {frequency} times! 🎉
      </h3>
      {percentage ? (
        <ul>
          On your happier days, you completed on average {percentage}% of your
          daily self care goals
        </ul>
      ) : null}
      {favoriteGoals ? (
        <div>
          <h3>Your favorite self care goals (in order) were</h3>
          <ol>
            {favoriteGoals.map((goal, idx) => {
              // eslint-disable-next-line react/no-array-index-key
              return <li key={idx}>{goal.description}</li>
            })}
          </ol>
        </div>
      ) : null}
    </div>
  ) : null
}

export default MobileOverview
