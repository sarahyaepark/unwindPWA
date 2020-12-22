import axios from 'axios'
import history from '../history'

const GET_GOAL = 'GET_GOAL'
const UPDATE_GOAL = 'UPDATE_GOAL'

const getGoal = goal => ({type: GET_GOAL, goal})
const updatingGoal = goal => ({type: UPDATE_GOAL, goal})

export const getCurrentDate = () => {
  let date = new Date()
  let day = date.getDate()
  if (day.toString().length === 1) day = '0' + day
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return year + '-' + month + '-' + day
}

export const addGoal = (
  userId,
  description,
  dailyEntryId
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `mutation{addGoal(userId:${userId}, dateCreated:"${getCurrentDate()}", description: "${description}"),{description,dateCreated}}`
    })
  } catch (authError) {
    return dispatch(getGoal({error: authError}))
  }
  try {
    dispatch(getGoal(res.data.data.addGoal))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const updateGoal = (
  userId,
  goalId,
  completed,
  active,
  dailyEntryId,
  description
) => async dispatch => {
  let res
  try {
    if (description) {
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, dateCreated:"${getCurrentDate()}", description:"${description}"),{id,description,completed}}`
      })
    } else if (active !== undefined) {
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, dateCreated:"${getCurrentDate()}", active:${active}),{id,description,completed}}`
      })
    } else if (dailyEntryId !== undefined) {
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, completed:${completed}, dateCreated:"${getCurrentDate()}", dailyEntryId:${dailyEntryId}),{id,description,completed}}`
      })
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, dateCreated:"${getCurrentDate()}", completed:${completed}),{id,description,completed}}`
      })
    }
  } catch (authError) {
    return dispatch(updatingGoal({error: authError}))
  }
  try {
    dispatch(updatingGoal(res.data.data.updateGoal))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_GOAL:
      return action.goal
    case UPDATE_GOAL:
      return action.goal
    default:
      return state
  }
}
