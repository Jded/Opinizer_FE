import {BE_ADDR, ADD_ERROR} from "./../constants.js";
import {parseJsonResponse} from "./helpers.js";
export const LOGIN_USER = 'LOGIN_USER';

function loginStart() {
    return {
        type: LOGIN_USER
    }
}

export const LOGIN_USER_REPLY = 'LOGIN_USER_REPLY';

function loginSuccess(userData) {
    return {
        type: LOGIN_USER_REPLY,
        payload:userData
    }
}

function loginFailure(error) {
    return {
        type: LOGIN_USER_REPLY,
        error:true,
        payload:error
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';
function logoutStart(){
    return {
        type: LOGOUT_USER
    }
}

export const LOGOUT_USER_REPLY = 'LOGOUT_USER_REPLY';
function logoutSuccess(){
    return {
        type: LOGOUT_USER_REPLY
    }
}
function logoutFailure(error){
    return {
        type: ADD_ERROR,
        error:true,
        payload:error
    }
}

export const REGISTER_USER = 'REGISTER_USER';

function registrationStart() {
    return {
        type: LOGIN_USER
    }
}

export const REGISTER_USER_REPLY = 'REGISTER_USER_REPLY';

function registrationSuccess(userId) {
    return {
        type: REGISTER_USER_REPLY,
        payload:userId
    }
}

function registrationFailure(error) {
    return {
        type: REGISTER_USER_REPLY,
        error:true,
        payload:error
    }
}


export function createSession(email, password) {
    return function (dispatch) {
        dispatch(loginStart)

        const payload = JSON.stringify({email:email,password:password})
        const options = {
            method: 'POST',
            body: payload,
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/session",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(loginSuccess(json))
            ).catch(error=>
                dispatch(loginFailure(error))
            )
    }
}

export function deleteSession(){
    return function (dispatch) {
        dispatch(loginStart)
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/session",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(logoutSuccess(json))
            ).catch(error=>
                dispatch(logoutFailure(error))
            )
    }
}

export function getSession(){
    return function (dispatch) {
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/session",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(loginSuccess(json))
            ).catch(error=>{})
    }
}

export function doRegister(userData) {
    return function (dispatch) {
        dispatch(registrationStart)

        const payload = JSON.stringify(userData)
        const options = {
            method: 'POST',
            body: payload
        };
        return fetch(BE_ADDR + "/user",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(registrationSuccess(json))
            ).catch(error=>
                dispatch(registrationFailure(error))
            )
    }
}