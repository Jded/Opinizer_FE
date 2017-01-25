import { combineReducers } from 'redux'
import user from './user'
import error from './error'
//import visibilityFilter from './visibilityFilter'

const reduceDefault = combineReducers({
    user,
    error
})

export default reduceDefault