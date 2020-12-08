import axios from 'axios'
import history from '../history'

const GET_GOAL = 'GET_GOAL'
const UPDATE_GOAL = 'UPDATE_GOAL'

const getGoal = goal => ({type: GET_GOAL, goal})
const updatingGoal = goal => ({type: UPDATE_GOAL, goal})

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
  dailyEntryId,
  description
) => async dispatch => {
  let res
  try {
    if (description) {
      console.log('updating description', goalId, description, '***')
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, description:"${description}"),{id,description,completed}}`
      })
    } else if (active !== undefined) {
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
      console.log('IT SHOULD BE COMING HERE~~~~~')
      res = await axios.post(`/api`, {
        query: `mutation{updateGoal(id:${goalId}, completed:${completed}),{id,description,completed}}`
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
