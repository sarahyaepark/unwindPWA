import axios from 'axios'
import history from '../history'

const GET_OVERVIEW = 'GET_OVERVIEW'

const getOverview = overview => ({type: GET_OVERVIEW, overview})

// example data format

/*
let data = [{
    date,
    details: [
        {
            date,
            mood,
            compliment,
            journal
            goals: [
                {
                    description,
                    completed
                }
            ]
        }
    ],
    {
    date,
    details: [
        {
            date,
            mood,
            compliment,
            journal
            goals: [
                {
                    description,
                    completed
                }
            ]
        }
    ]
},
}]
*/

export const fetchOverview = userId => async dispatch => {
  console.log('in the fetch overview thunk')
  try {
    let data = []
    console.log('fetching overviewwwww')
    // this returns an array of objects: date, journal, mood, compliment, and dailyentryId
    let dailyEntries = await axios.post(`/api`, {
      query: `{dailyEntries(userId:${userId}),{id, date, journal, mood, compliment}}`
    })
    // this returns an array of arrays of objects: daily goal id, completed, description, datecreated
    console.log(dailyEntries)
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
              console.log('TRYING TO GET TOTAL', prev, e.mood)
              return prev + e.mood
            }, 0)
            return this
          }
        }.init()
        console.log(currentGoal.data.data.goals)
        data.push(tempObject)
        return currentGoal.data.data.goals
      })
    )
    console.log(data)
    dispatch(getOverview(data))
  } catch (authError) {
    return dispatch(getOverview({error: authError}))
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
