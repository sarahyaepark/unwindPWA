import axios from 'axios'
import history from '../history'
// import {addGoal, updateGoal} from './dailyGoal'

const GET_GOALS = 'GET_GOALS'

const getGoals = goals => ({type: GET_GOALS, goals})

export const getCurrentDate = () => {
  let date = new Date()
  let day = date.getDate()
  if (day.toString().length === 1) day = '0' + day
  let month = date.getMonth() + 1
  if (month.toString().length === 1) month = '0' + month
  let year = date.getFullYear()
  return year + '-' + month + '-' + day
}

export const fetchGoals = userId => async dispatch => {
  let res
  try {
    let updated = false
    let currentDate = getCurrentDate()
    res = await axios.post(`/api`, {
      query: `{activeGoals(userId:${userId}, dateCreated:"${currentDate}"),{description,id,completed,dateCreated,dailyEntryId}}`
    })
    if (res.data.data.activeGoals[0].dateCreated !== currentDate) {
      await Promise.all(
        res.data.data.activeGoals.map(async goal => {
          if (goal.dateCreated !== currentDate) {
            updated = true
            res = await axios.post(`/api`, {
              query: `mutation{addGoal(userId:${userId}, dateCreated:"${currentDate}", description: "${
                goal.description
              }"),{description,dateCreated}}`
            })
            // dispatch(addGoal(userId, goal.description))
            res = await axios.post(`/api`, {
              query: `mutation{updateGoal(id:${
                goal.id
              }, dateCreated:"${currentDate}", active:${false}),{id,description,completed}}`
            })
          }
        })
      )
    }
    if (updated) {
      let currentGoals = await axios.post(`/api`, {
        query: `{activeGoals(userId:${userId}, dateCreated:"${currentDate}"),{description,id,completed,dateCreated,dailyEntryId}}`
      })
      dispatch(getGoals(currentGoals.data.data.activeGoals))
    } else {
      dispatch(getGoals(res.data.data.activeGoals))
    }
    history.push('/home')
  } catch (authError) {
    return dispatch(getGoals({error: authError}))
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
