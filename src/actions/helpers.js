import {BE_ADDR} from "./../constants.js";

export function parseJsonResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}
export function parseBlobResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.blob();
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePassword(pass){
    const re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/
    return re.test(pass);
}

export function validateLogin(login){
    const options = {
        method: 'GET'
    }
    return fetch(BE_ADDR + "/user/validate-login/"+login,options)
}

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_REPLY = 'REGISTER_USER_REPLY';