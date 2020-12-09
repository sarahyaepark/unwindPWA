import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import dailyGoal from './dailyGoal'
import goals from './goals'
import dailyEntry from './dailyEntry'
import overview from './overview'
import currentView from './currentView'
import compliment from './compliments'

const reducer = combineReducers({
  user,
  dailyGoal,
  goals,
  dailyEntry,
  overview,
  currentView,
  compliment
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './dailyGoal'
export * from './goals'
export * from './dailyEntry'
export * from './overview'
export * from './currentView'
export * from './compliments'
