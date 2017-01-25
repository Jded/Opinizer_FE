import {ADD_ERROR,REMOVE_ERROR} from "./../constants";
import {LOGIN_USER_REPLY} from "./../actions/user";

const error = (state = [], action) => {
    switch (action.type) {
        case ADD_ERROR:
            return Object.assign({}, state, {
            errors: [].concat(state.errors,[action.payload])
        })
        case REMOVE_ERROR:
            return Object.assign({}, state, {
            errors: state.errors?state.errors.filter((el,index)=>{index != action.payload}):[]
        })
        case LOGIN_USER_REPLY:
            if(action.error){
                return Object.assign({}, state, {
                    errors: [].concat(state.errors,[action.payload])
                })
            }
        default:
            return state
    }
}

export default error