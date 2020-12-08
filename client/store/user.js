import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})

export const me = () => dispatch => {
  try {
    let currentUser = {}
    if (window.localStorage.getItem('id')) {
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
      userInfo = res.data.data.user
      if (userInfo.id) dispatch(getUser(userInfo))
      else return 'error'
      history.push('/home')
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{addUser(firstName:"${firstName}", email: "${cleanEmail}", password: "${password}"),{id, firstName, email}}`
      })
      userInfo = res.data.data.addUser
      console.log(userInfo)
      dispatch(getUser(userInfo))
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
}
const updateLocal = firstName => {
  if (window.localStorage.getItem('id')) {
    window.localStorage.setItem('firstName', firstName)
  } else if (window.sessionStorage.getItem('id')) {
    window.sessionStorage.setItem('firstName', firstName)
  }
}
// eslint-disable-next-line complexity
export const updateUserInfo = (
  email,
  firstName,
  password,
  oldPassword
) => async dispatch => {
  try {
    let cleanEmail = email.toLowerCase()
    if (password && oldPassword) {
      let checkPass = await axios.post(`/api`, {
        query: `{user(email: "${cleanEmail}", password: "${oldPassword}"),{id, firstName, email}}`
      })
      console.log(checkPass, email, firstName, password, oldPassword)
      if (checkPass.data.data.user.id) {
        let res = await axios.post(`/api`, {
          query: `mutation{updateUser(email:"${cleanEmail}", firstName: "${firstName}", password: "${password}"),{id, firstName, email}}`
        })
        console.log('in here')
        updateLocal(res.data.data.updateUser.firstName)
        dispatch(updateUser(res.data.data.updateUser))
      } else {
        return 'error'
      }
    } else {
      let res = await axios.post(`/api`, {
        query: `mutation{updateUser(email:"${cleanEmail}", firstName: "${firstName}"),{id, firstName, email}}`
      })
      updateLocal(res.data.data.updateUser.firstName)
      dispatch(updateUser(res.data.data.updateUser))
    }
  } catch (err) {
    console.log(err)
  }
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
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
