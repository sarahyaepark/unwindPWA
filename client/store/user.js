import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, firstName) => async dispatch => {
  let res
  let cleanEmail = email.toLowerCase()
  try {
    if (method === 'login') {
      res = await axios.post(`/api`, {
        query: `{user(email: "${cleanEmail}", password: "${password}"),{id, firstName, email}}`
      })
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{addUser(firstName:"${firstName}", email: "${cleanEmail}", password: "${password}"),{id, firstName, email}}`
      })
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    if (method === 'login') {
      console.log(res.data)
      dispatch(getUser(res.data.data.user))
      history.push('/home')
    } else {
      dispatch(getUser(res.data.data.addUser))
      history.push('/setGoals')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
