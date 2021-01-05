import axios from 'axios'
import history from '../history'
import {updateGoal} from './dailyGoal'
import {fetchOverview} from './overview'
const GET_ENTRY = 'GET_ENTRY'
// const REMOVE_USER = 'REMOVE_USER'

const getEntry = entry => ({type: GET_ENTRY, entry})

export const getCurrentDate = () => {
  let date = new Date()
  let day = date.getDate()
  if (day.toString().length === 1) day = '0' + day
  let month = date.getMonth() + 1
  if (month.toString().length === 1) month = '0' + month
  let year = date.getFullYear()
  return year + '-' + month + '-' + day
}

export const addEntry = (
  userId,
  mood,
  journal,
  compliment
) => async dispatch => {
  let res
  try {
    if (journal && compliment) {
      res = await axios.post(`/api`, {
        query: `mutation{addDailyEntry(userId:${userId},mood:${mood},journal: "${journal}",compliment:"${compliment}", dateCreated:"${getCurrentDate()}"),{id,journal,mood,compliment}}`
      })
    } else if (journal) {
      res = await axios.post(`/api`, {
        query: `mutation{addDailyEntry(userId:${userId},mood:${mood},journal: "${journal}", dateCreated:"${getCurrentDate()}"),{id,journal,mood,compliment}}`
      })
    } else if (compliment) {
      res = await axios.post(`/api`, {
        query: `mutation{addDailyEntry(userId:${userId},mood:${mood},compliment: "${compliment}", dateCreated:"${getCurrentDate()}"),{id,journal,mood,compliment}}`
      })
    } else {
      res = await axios.post(`/api`, {
        query: `mutation{addDailyEntry(userId:${userId},mood:${mood}, dateCreated:"${getCurrentDate()}"),{id,journal,mood,compliment}}`
      })
    }
    let goalRes = await axios.post(`/api`, {
      query: `{activeGoals(userId:${userId}, dateCreated:"${getCurrentDate()}"),{description,id,completed,dateCreated}}`
    })
    await Promise.all(
      goalRes.data.data.activeGoals.map(async goal => {
        let completed
        if (window.sessionStorage.getItem('goalId' + goal.id)) {
          completed =
            window.sessionStorage.getItem('goalId' + goal.id) === 'true'
        } else if (window.localStorage.getItem('goalId' + goal.id)) {
          completed = window.localStorage.getItem('goalId' + goal.id) === 'true'
        } else {
          completed = false
        }
        await axios.post(`/api`, {
          query: `mutation{updateGoal(id:${
            goal.id
          }, completed:${completed}, dateCreated:"${getCurrentDate()}", dailyEntryId:${
            res.data.data.addDailyEntry.id
          }),{id,description,completed}}`
        })
        // dispatch(
        //   updateGoal(
        //     null,
        //     goal.id,
        //     completed,
        //     undefined,
        //     res.data.data.addDailyEntry.id
        //   )
        // )
      })
    )
    dispatch(fetchOverview(userId))
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
      query: `mutation{updateEntry(userId:${userId}, date:"${getCurrentDate()}, mood:"${mood}", journal:"${journal}",compliment:"${compliment}"),{id,userId,mood,journal,date,compliment}}`
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
