import axios from 'axios'
import history from '../history'
import {addGoal, updateGoal} from './dailyGoal'

const GET_GOALS = 'GET_GOALS'

const getGoals = goals => ({type: GET_GOALS, goals})

export const getCurrentDate = () => {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return year + '-' + month + '-' + day
}
export const fetchGoals = userId => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `{activeGoals(userId:${userId}),{description,id,completed,dateCreated,dailyEntryId}}`
    })
    res.data.data.activeGoals.map(goal => {
      if (goal.dateCreated !== getCurrentDate()) {
        dispatch(addGoal(userId, goal.description))
        dispatch(updateGoal(null, goal.id, null, false))
      }
    })
    let currentGoals = await axios.post(`/api`, {
      query: `{activeGoals(userId:${userId}),{description,id,completed,dateCreated,dailyEntryId}}`
    })
    console.log(currentGoals)
    dispatch(getGoals(currentGoals.data.data.activeGoals))
    history.push('/home')
  } catch (authError) {
    return dispatch(getGoals({error: authError}))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_GOALS:
      return action.goals
    default:
      return state
  }
}
