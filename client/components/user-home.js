import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchGoals, me, updateGoal, getCurrentDate} from '../store'
import DailyEntry from './dailyEntry'
import Goodnight from './goodnight'
import EditableLabel from 'react-inline-editing'
import EditIcon from '@material-ui/icons/Edit'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {userId, firstName, goals} = props
  const [loaded, loading] = useState(false)
  const [sortedGoals, setSortedGoals] = useState(false)
  const [goodnight, setGoodnight] = useState(false)
  let currentDate

  const newDay = date => {
    let today = getCurrentDate()
    if (today !== date) return true
    else return false
  }

  useEffect(() => {
    // props.me()
    loading(true)
  }, [])
  useEffect(
    () => {
      if (loaded) props.fetchGoals(userId)
    },
    [loaded]
  )
  useEffect(
    () => {
      if (goals.length) {
        if (goals[0].dailyEntryId) setGoodnight(true)
        else setGoodnight(false)
        if (newDay(goals[0].dateCreated)) setGoodnight(false)
        setSortedGoals(goals.sort((a, b) => a.id - b.id))
      }
    },
    [goals]
  )

  const handleCheckBoxToggle = (goalId, completed) => {
    props.updateGoal(userId, goalId, !completed).then(() => {
      props.fetchGoals(userId)
      setSortedGoals(goals.sort((a, b) => a.id - b.id))
    })
  }

  const handleFocus = text => {}

  const handleFocusOut = (text, goalId) => {
    props.updateGoal(null, goalId, null, null, null, text)
  }

  const greeting = () => {
    if (goodnight) {
      return 'Goodnight'
    } else {
      return 'Time to check in'
    }
  }
  const dayOfTheWeek = () => {
    let d = new Date()
    let weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'
    return weekday[d.getDay()]
  }
  return (
    <div className="UserHomeDiv">
      {firstName !== null ? (
        <div>
          <h3>
            {greeting()}, {firstName} ✨
          </h3>
          <h4>Happy {dayOfTheWeek()}!</h4>
        </div>
      ) : (
        <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" />
      )}
      <br />
      {goodnight ? (
        <Goodnight />
      ) : (
        <div className="GoalsListDiv">
          <h3>🥰 Your Daily Self Care Goals 🥰</h3>
          <br />
          <div>
            {sortedGoals ? (
              sortedGoals.map(goal => {
                return (
                  <div key={goal.id} className="GoalsList">
                    <div className="GoalCheck">
                      {!goal.completed ? (
                        <img
                          className="checkBox"
                          src="https://i.imgur.com/YXbSdoH.png"
                          onClick={() =>
                            handleCheckBoxToggle(goal.id, goal.completed)
                          }
                        />
                      ) : (
                        <img
                          className="checkBox"
                          src="https://i.imgur.com/Giad7aJ.png"
                          onClick={() =>
                            handleCheckBoxToggle(goal.id, goal.completed)
                          }
                        />
                      )}
                      {/* <h2 className="goalDescription">{goal.description}</h2> */}
                      <EditableLabel
                        text={goal.description}
                        labelClassName="goalDescription"
                        inputWidth="200px"
                        inputHeight="25px"
                        labelFontSize="1.5rem"
                        labelFontWeight="bold"
                        inputFontWeight="bold"
                        onFocus={handleFocus}
                        onFocusOut={text => handleFocusOut(text, goal.id)}
                      />
                      <EditIcon className="EditIcon" />
                    </div>

                    <br />
                  </div>
                )
              })
            ) : (
              <img src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif" />
            )}
          </div>
          <br />
          <DailyEntry newDay={newDay} oldDate={currentDate} />
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    user: state.user,
    userId: state.user.id,
    goals: state.goals
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGoals: userId => dispatch(fetchGoals(userId)),
    me: () => dispatch(me()),
    updateGoal: (
      userId,
      goalId,
      completed,
      active,
      dailyEntryId,
      description
    ) =>
      dispatch(
        updateGoal(userId, goalId, completed, active, dailyEntryId, description)
      )
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
