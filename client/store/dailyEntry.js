import axios from 'axios'
import history from '../history'

const GET_ENTRY = 'GET_ENTRY'
// const REMOVE_USER = 'REMOVE_USER'

const getEntry = entry => ({type: GET_ENTRY, entry})
/**
 * THUNK CREATORS
 */

export const addEntry = (
  userId,
  mood,
  journal,
  compliment
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `mutation{addDailyEntry(userId:${userId},mood:${mood},journal: "${journal}",compliment:"${compliment}"),{id,journal,mood,compliment}}`
    })
  } catch (authError) {
    return dispatch(getEntry({error: authError}))
  }
  try {
    dispatch(getEntry(res.data.data.addDailyEntry))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const fetchEntry = id => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `{dailyEntry(id:${id}),{id,journal,mood,compliment}}`
    })
  } catch (authError) {
    return dispatch(getEntry({error: authError}))
  }
  try {
    dispatch(getEntry(res.data.data.dailyEntry))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const updateEntry = (
  userId,
  mood,
  journal,
  compliment
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `mutation{updateEntry(userId:${userId}, date:"${Date.now()}, mood:"${mood}", journal:"${journal}",compliment:"${compliment}"),{id,userId,mood,journal,date,compliment}}`
    })
  } catch (authError) {
    return dispatch(getEntry({error: authError}))
  }
  try {
    dispatch(getEntry(res.data.data.updateEntry))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ENTRY:
      return action.entry
    default:
      return state
  }
}
