import axios from 'axios'
import history from '../history'

const GET_OVERVIEW = 'GET_OVERVIEW'

const getOverview = overview => ({type: GET_OVERVIEW, overview})

export const fetchOverview = userId => async dispatch => {
  try {
    let data = []
    // this returns an array of objects: date, journal, mood, compliment, and dailyentryId
    let dailyEntries = await axios.post(`/api`, {
      query: `{dailyEntries(userId:${userId}),{id, date, journal, mood, compliment}}`
    })
    if (dailyEntries.data.data.dailyEntries.length < 1) {
      dispatch(getOverview('no entries'))
      return
    }
    // this returns an array of arrays of objects: daily goal id, completed, description, datecreated
    await Promise.all(
      dailyEntries.data.data.dailyEntries.map(async dailyEntry => {
        let currentGoal = await axios.post(`/api`, {
          query: `{goals(userId:${userId}, dailyEntryId: ${
            dailyEntry.id
          }),{id, completed, description, dateCreated}}`
        })
        let tempObject = {
          date: dailyEntry.date,
          details: [
            {
              // 'date': dailyEntry.date,
              mood: dailyEntry.mood,
              compliment: dailyEntry.compliment,
              journal: dailyEntry.journal,
              goals: currentGoal.data.data.goals
            }
          ],
          init: function() {
            this.total = this.details.reduce(function(prev, e) {
              return prev + e.mood
            }, 0)
            return this
          }
        }.init()
        data.push(tempObject)
        return currentGoal.data.data.goals
      })
    )
    dispatch(getOverview(data))
  } catch (e) {
    return dispatch(getOverview({error: e}))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_OVERVIEW:
      return action.overview
    default:
      return state
  }
}
