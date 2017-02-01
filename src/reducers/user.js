import {LOGIN_USER,LOGIN_USER_REPLY,LOGOUT_USER,LOGOUT_USER_REPLY, REGISTER_USER_REPLY,REGISTER_USER, UPDATE_USER, UPDATE_USER_REPLY,UPDATE_PASSWORD,UPDATE_PASSWORD_REPLY} from './../actions/user';

const initialState = {
    isFetching: false,
    loggedUser: null
}

const user = (state = initialState, action) => {
switch (action.type) {
    case LOGIN_USER:
        return Object.assign({}, state, {
        isFetching: true,
        loggedUser:null})
    case LOGIN_USER_REPLY:
        if(!action.error){
            return Object.assign({}, state, {
                isFetching: false,
                loggedUser:action.payload
            })
        }else{
            return Object.assign({}, state, {
                isFetching: false,
                loggedUser:null
            })
        }
    case LOGOUT_USER:
        return Object.assign({}, state, {
            isFetching: true})
    case LOGOUT_USER_REPLY:
        if(!action.error){
            return Object.assign({}, state, {
                isFetching: false,
                loggedUser:null
        })}else{
            return Object.assign({}, state, {
                isFetching: false
            })
        }
    case REGISTER_USER:
        return Object.assign({}, state, {
            isFetching: true})
    case REGISTER_USER_REPLY:
        if(!action.error){
            return Object.assign({}, state, {
                isFetching: false,
                loggedUser:null,
                justRegistered:true
            })}else{
            return Object.assign({}, state, {
                isFetching: false
            })
        }
    case UPDATE_USER:
    case UPDATE_PASSWORD:
        return Object.assign({}, state, {
            isFetching: true})
    case UPDATE_USER_REPLY:
        if(!action.error){
            return Object.assign({}, state, {
                isFetching: false,
                loggedUser:action.payload,
                justRegistered:false
            })}else{
            return Object.assign({}, state, {
                isFetching: false
            })
        }
    case UPDATE_PASSWORD_REPLY:
        return Object.assign({}, state, {
            isFetching: false
        })
    default:
        return state
    }
}

export default user