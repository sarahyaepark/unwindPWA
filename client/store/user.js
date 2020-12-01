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

export const me = () => dispatch => {
  try {
    console.log(
      'figuring out the order of events',
      window.localStorage.getItem('id')
    )
    let currentUser = {}
    if (window.localStorage.getItem('id')) {
      console.log('gotithere')
      currentUser = {
        id: window.localStorage.getItem('id'),
        firstName: window.localStorage.getItem('firstName'),
        email: window.localStorage.getItem('email')
      }
    } else if (window.sessionStorage.getItem('id')) {
      currentUser = {
        id: window.sessionStorage.getItem('id'),
        firstName: window.sessionStorage.getItem('firstName'),
        email: window.sessionStorage.getItem('email')
      }
    }
    console.log('getting called here too', currentUser)
    dispatch(getUser(currentUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  checked,
  firstName
) => async dispatch => {
  let res
  let cleanEmail = email.toLowerCase()
  let userInfo
  try {
    if (method === 'login') {
      res = await axios.post(`/api`, {
        query: `{user(email: "${cleanEmail}", password: "${password}"),{id, firstName, email}}`
      })
      console.log('~~~~~~~~~~~', res)
      userInfo = res.data.data.user
      dispatch(getUser(userInfo))
      history.push('/home')
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{addUser(firstName:"${firstName}", email: "${cleanEmail}", password: "${password}"),{id, firstName, email}}`
      })
      userInfo = res.data.data.addUser
      dispatch(getUser(userInfo))
      history.push('/setGoals')
    }
    if (checked) {
      // store data in local storage
      console.log('setting the local storage')
      window.localStorage.setItem('id', userInfo.id)
      window.localStorage.setItem('firstName', userInfo.firstName)
      window.localStorage.setItem('email', userInfo.email)
    } else {
      // store data in sessions storage
      window.sessionStorage.setItem('id', userInfo.id)
      window.sessionStorage.setItem('firstName', userInfo.firstName)
      window.sessionStorage.setItem('email', userInfo.email)
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  // try {
  //   if (checked) {
  //     // store data in local storage
  //     window.localStorage.setItem('id', userInfo.id)
  //     window.localStorage.setItem('firstName', userInfo.firstName)
  //     window.localStorage.setItem('email', userInfo.email)
  //   } else {
  //     // store data in sessions storage
  //     window.sessionStorage.setItem('id', userInfo.id)
  //     window.sessionStorage.setItem('firstName', userInfo.firstName)
  //     window.sessionStorage.setItem('email', userInfo.email)
  //   }
  // } catch (dispatchOrHistoryErr) {
  //   console.error(dispatchOrHistoryErr)
  // }
}

export const logout = () => async dispatch => {
  try {
    // delete data from sessions/local storage
    await axios.post('/auth/logout')
    dispatch(removeUser())
    window.localStorage.clear()
    window.sessionStorage.clear()
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
