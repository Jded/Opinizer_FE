export const ADD_MESSAGE = "ADD_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export function removeMessage(index) {
    return {
            type: REMOVE_MESSAGE,
            payload:index
        }
    }