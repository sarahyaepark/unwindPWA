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
    console.log('adding new goal', userId, description)
    res = await axios.post(`/api`, {
      query: `mutation{addGoal(userId:${userId}, description: "${description}"),{description,dateCreated}}`
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
  dailyEntryId
) => async dispatch => {
  let res
  try {
    console.log(dailyEntryId, active, '*****************')
    if (active !== undefined) {
      console.log('in here updating active')
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, active:${active}),{id,description,completed}}`
      })
    } else if (dailyEntryId !== undefined) {
      console.log('in here updating dailyentryid in goals')
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, dailyEntryId:${dailyEntryId}),{id,description,completed}}`
      })
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, completed:${completed}),{id,description,completed}}`
      })
    }
  } catch (authError) {
    return dispatch(getGoal({error: authError}))
  }
  try {
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
