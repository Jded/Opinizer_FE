import {ADD_MESSAGE,REMOVE_MESSAGE} from "./../actions/message";
import {LOGIN_USER_REPLY,UPDATE_USER_REPLY,UPDATE_PASSWORD_REPLY,LOGOUT_USER_REPLY} from "./../actions/user";

const message = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [].concat(state,[action.payload]);
        case REMOVE_MESSAGE:
            return state?state.filter((el,index)=>{index != action.payload}):[];
        case LOGIN_USER_REPLY:
            if(action.error){
                return [].concat(state,["Login failed"]);
            }else{
                return [].concat(state,["Login successful"]);
            }
        case LOGOUT_USER_REPLY:
            if(action.error){
                return [].concat(state,["Logout failed"]);
            }else{
                return [].concat(state,["Logout successful"]);
            }
        case UPDATE_USER_REPLY:
        case UPDATE_PASSWORD_REPLY:
            if(action.error){
                return [].concat(state,["Password update failed"]);
            }else{
                return [].concat(state,["Update successful"]);
            }
        default:
            return state
    }
}

export default message