import axios from 'axios'
import history from '../history'

const GET_GOALS = 'GET_GOALS'

const getGoals = goals => ({type: GET_GOALS, goals})

export const fetchGoals = userId => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `{activeGoals(userId:"${userId}"),{description,id,completed}}`
    })
  } catch (authError) {
    return dispatch(getGoals({error: authError}))
  }
  try {
    dispatch(getGoals(res.data.data.activeGoals))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
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
