const GET_CURRENTVIEW = 'GET_CURRENTVIEW'

const getCurrentView = currentView => ({type: GET_CURRENTVIEW, currentView})

export const setView = overview => dispatch => {
  dispatch(getCurrentView(overview))
}

/**
 * REDUCER
 */
export default function(state = '', action) {
  switch (action.type) {
    case GET_CURRENTVIEW:
      return action.currentView
    default:
      return state
  }
}
