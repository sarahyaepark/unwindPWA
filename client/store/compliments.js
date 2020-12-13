import axios from 'axios'

const GET_COMPLIMENT = 'GET_COMPLIMENT'

const getCompliment = compliment => ({type: GET_COMPLIMENT, compliment})

export const getCompliments = userId => async dispatch => {
  let res
  try {
    res = await axios.post(`/api`, {
      query: `{compliments(userId:${userId}),{compliment,date}}`
    })
    const compliments = res.data.data.compliments.filter(
      compliment => compliment.compliment !== null
    )
    if (compliments.length === 0) dispatch(getCompliment({}))
    else {
      let randomIdx = Math.floor(Math.random() * compliments.length)
      dispatch(getCompliment(compliments[randomIdx]))
    }
  } catch (authError) {
    console.log(authError)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_COMPLIMENT:
      return action.compliment
    default:
      return state
  }
}
