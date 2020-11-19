import axios from 'axios'
import history from '../history'

const GET_GOAL = 'GET_GOAL'
// const REMOVE_USER = 'REMOVE_USER'

const getGoal = goal => ({type: GET_GOAL, goal})
/**
 * THUNK CREATORS
 */

export const addGoal = (
  userId,
  description,
  dailyEntryId
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `mutation{addGoal(userId:"${userId}", description: "${description}"),{description}}`
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

export const updateGoal = (userId, goalId, completed) => async dispatch => {
  let res
  try {
    console.log('INSIDE THUNK', goalId, completed)
    res = await axios.post(`/api`, {
      query: `mutation{updateGoal(id:${goalId}, completed:${completed}),{id,description,completed}}`
    })
    console.log(res)
  } catch (authError) {
    return dispatch(getGoal({error: authError}))
  }
  try {
    console.log(res.data.data.updateGoal)
    dispatch(getGoal(res.data.data.updateGoal))
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
    default:
      return state
  }
}
