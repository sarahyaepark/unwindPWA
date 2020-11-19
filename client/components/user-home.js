import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchGoals, me, updateGoal} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {userId, firstName, goals} = props
  const [loaded, loading] = useState(false)

  useEffect(() => {
    props.me()
    loading(true)
  }, [])
  useEffect(
    () => {
      if (loaded) props.fetchGoals(userId)
    },
    [loaded]
  )

  const handleCheckBoxToggle = (goalId, completed) => {
    props.updateGoal(userId, goalId, !completed).then(() => {
      props.fetchGoals(userId)
    })
  }
  return (
    <div className="UserHomeDiv">
      {firstName !== null ? (
        <h3>Welcome, {firstName}</h3>
      ) : (
        <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" />
      )}

      <div className="GoalsListDiv">
        {goals
          ? goals.map(goal => {
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
                    <h2 className="goalDescription">{goal.description}</h2>
                  </div>
                  <br />
                </div>
              )
            })
          : null}

        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    userId: state.user.id,
    goals: state.goals
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGoals: userId => dispatch(fetchGoals(userId)),
    me: () => dispatch(me()),
    updateGoal: (userId, goalId, completed) =>
      dispatch(updateGoal(userId, goalId, completed))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
