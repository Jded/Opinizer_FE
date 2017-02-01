import { combineReducers } from 'redux'
import user from './user'
import message from './message'
import category from './category'
//import visibilityFilter from './visibilityFilter'

const reduceDefault = combineReducers({
    user,
    message,
    category
})

export default reduceDefault