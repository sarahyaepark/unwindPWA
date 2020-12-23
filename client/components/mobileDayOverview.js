import React, {useState, useEffect} from 'react'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import CheckIcon from '@material-ui/icons/Check'

const MobileDayOverview = props => {
  const {activeDate, overview, formatDate} = props
  const [goals, setGoals] = useState('')
  const [compliment, setCompliment] = useState('')
  const [journal, setJournal] = useState('')
  const [mood, setMood] = useState('')
  const findActiveData = () => {
    for (const data of overview) {
      if (data.date === formatDate(activeDate).toString()) {
        return data
      }
    }
    setMood('')
    return ''
  }

  useEffect(
    () => {
      let currentData = findActiveData()
      if (currentData !== '') {
        let completedGoals = currentData.details[0].goals.filter(
          goal => goal.completed === true
        )
        setGoals(completedGoals || null)
        setCompliment(currentData.details[0].compliment || null)
        setJournal(currentData.details[0].journal || null)
        setMood(currentData.details[0].mood)
      }
    },
    [activeDate]
  )

  const formatMood = moodNum => {
    if (moodNum === 0) return '😔'
    else if (moodNum === 25) return '😕'
    else if (moodNum === 50) return '😐'
    else if (moodNum === 75) return '🙂'
    else if (moodNum === 100) return '😊'
  }

  return mood === 0 || mood ? (
    <div className="mobileDayOverview">
      {/* <div> */}
      <h1>
        An overview of your day on {moment(activeDate).format('MMMM DD YYYY')}
      </h1>
      <hr />
      <h1>{formatMood(mood)}</h1>
      {goals.length > 0 ? (
        <div>
          <h3>Completed self care goals:</h3>
          {goals.map(goal => {
            return (
              <ul key={goal.id}>
                <CheckIcon style={{color: 'cyan'}} />
                {goal.description}
              </ul>
            )
          })}
        </div>
      ) : null}
      {journal ? (
        <div>
          <h3>Journal: {journal}</h3>
        </div>
      ) : null}
      {compliment ? (
        <div>
          <h3>Self-compliment: {compliment}</h3>
        </div>
      ) : null}
      {/* </div> */}
    </div>
  ) : null
}

export default MobileDayOverview
