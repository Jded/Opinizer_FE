import {BE_ADDR} from "./../constants.js";
import {ADD_MESSAGE} from "./message";
import {parseJsonResponse} from "./helpers.js";

export const GET_CATEGORIES_REPLY = 'GET_CATEGORIES_REPLY';

function getCategoriesSuccess(collection,categoryData) {
    return {
        type: GET_CATEGORIES_REPLY,
        payload:{collection,categoryData}
    }
}

function getCategoriesFailure(collection,error) {
    return {
        type: GET_CATEGORIES_REPLY,
        error:true,
        payload:error
    }
}

export const GET_CATEGORIES = 'GET_CATEGORIES';
function getCategoriesStart(collection){
    return {
        type: GET_CATEGORIES,
        payload:collection
    }
}


export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
function categoryUpdateStart() {
    return {
        type: UPDATE_CATEGORY
    }
}

export const UPDATE_CATEGORY_REPLY = 'UPDATE_CATEGORY_REPLY';
function categoryUpdateSuccess(categoryData) {
    return {
        type: UPDATE_CATEGORY_REPLY,
        payload:categoryData
    }
}

function categoryUpdateFailure(error) {
    return {
        type: UPDATE_CATEGORY_REPLY,
        error:true,
        payload:error
    }
}

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
function deleteCategoryStart(){
    return {
        type: DELETE_CATEGORY
    }
}

export const DELETE_CATEGORY_REPLY = 'DELETE_CATEGORY_REPLY';
function deleteCategorySuccess(item_template_id){
    return {
        type: DELETE_CATEGORY_REPLY,
        payload:item_template_id
    }
}

function deleteCategoryFailure(error){
    return {
        type: DELETE_CATEGORY_REPLY,
        error:true,
        payload:error
    }
}

export const GET_CATEGORY = 'GET_CATEGORY';
function getCategoryStart(){
    return {
        type: GET_CATEGORY
    }
}

export const GET_CATEGORY_REPLY = 'GET_CATEGORY_REPLY';
function getCategorySuccess(categoryData){
    return {
        type: GET_CATEGORY_REPLY,
        payload:categoryData
    }
}

function getCategoryFailure(error){
    return {
        type: GET_CATEGORY_REPLY,
        error:true,
        payload:error
    }
}

export function deleteCategory(item_template_id){
    return function (dispatch) {
        dispatch(deleteCategoryStart(item_template_id))
        const options = {
            method: 'DELETE',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item_template/"+ item_template_id,options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(deleteCategorySuccess(item_template_id))
            ).catch(error=>
                dispatch(deleteCategoryFailure(error))
            )
    }
}

export function getRecentCategories(number){
    return function (dispatch) {
        dispatch(getCategoriesStart("recent"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template/recent/"+number,options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getCategoriesSuccess("recent",json))
            ).catch(error=>
                dispatch(getCategoriesFailure("recent",error))
            )
    }
}

export function getMyCategories(){
    return function (dispatch) {
        dispatch(getCategoriesStart("my"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item_template/my",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getCategoriesSuccess("my", json))
            ).catch(error=>
                dispatch(getCategoriesFailure("my", error))
            )
    }
}

export function getAllCategories(){
    return function (dispatch) {
        dispatch(getCategoriesStart("all"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getCategoriesSuccess("all",json))
            ).catch(error=>
                dispatch(getCategoriesFailure("all",error))
            )
    }
}

export function getCategory(categoryId){
    return function (dispatch) {
        dispatch(getCategoryStart())
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template/" + categoryId,options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getCategorySuccess(json))
            ).catch(error=>{
                dispatch(getCategoryFailure(json))
            })
    }
}

function addNewFiles(files,fileData) {
    if(files.length==0){
        return Promise.resolve(fileData);
    }
    let file = files.shift();
    const data = new FormData()
    data.append('file', file)

    return fetch(BE_ADDR + '/file', {
        method: 'POST',
        body: data,
        credentials: 'include'
    }).then(parseJsonResponse)
        .then((json)=>{
            return addNewFiles(files,fileData.concat([json]))
        })
}

export function doSaveCategory(categoryData,newFiles){

    return function (dispatch) {
        dispatch(categoryUpdateStart())

        addNewFiles(newFiles,[]).then((fileData)=>{
            categoryData.file_id = [].concat(fileData.map((file)=>{return file.file_id}));
            const payload = JSON.stringify(categoryData)
            const options = {
                method: 'POST',
                body: payload,
                credentials: 'include'
            };
            return fetch(BE_ADDR + "/item-template",options)
                .then(parseJsonResponse)
                .then(json =>
                    {
                        const options = {
                            method: 'GET',
                            credentials: 'include'
                        };
                        return fetch(BE_ADDR + "/item-template/" + json.item_template_id,options)
                        .then(parseJsonResponse)
                        .then(json =>
                            dispatch(categoryUpdateSuccess(json))
                        ).catch(error=>{
                            dispatch(categoryUpdateFailure(error))
                    })}
                ).catch(error=>
                    dispatch(categoryUpdateFailure(error))
                )
        })
    }
}

export const NEW_CATEGORY = "NEW_CATEGORY";
export function newCategory() {
    return {
        type: NEW_CATEGORY,
        payload:null
    }
}

export function doUpdateCategory(categoryData,newFiles){

    return function (dispatch) {
        dispatch(categoryUpdateStart())

        addNewFiles(newFiles,[]).then((fileData)=>{
            let existing_files = categoryData.file_id?categoryData.file_id:[];
            categoryData.file_id = [].concat(existing_files,fileData.map((file)=>{return file.file_id}));
            const payload = JSON.stringify(categoryData)
            const options = {
                method: 'PUT',
                body: payload,
                credentials: 'include'
            };
            return fetch(BE_ADDR + "/item-template/" + categoryData.item_template_id,options)
                .then(parseJsonResponse)
                .then(json =>
                    {
                        const options = {
                            method: 'GET',
                            credentials: 'include'
                        };
                        fetch(BE_ADDR + "/item-template/" + categoryData.item_template_id,options)
                        .then(parseJsonResponse)
                        .then(json =>
                            dispatch(categoryUpdateSuccess(json))
                        ).catch(error=>{
                            dispatch(categoryUpdateFailure(error))
                    })}
                ).catch(error=>
                    dispatch(categoryUpdateFailure(error))
                )
        })
    }

}

export const REMOVE_CATEGORY_NEW_FIELD = "REMOVE_CATEGORY_NEW_FIELD";
export function removeNewField(fieldData) {
    return {
        type: REMOVE_CATEGORY_NEW_FIELD,
        payload:fieldData
    }
}

export const REMOVE_CATEGORY_EXISTING_FIELD = "REMOVE_CATEGORY_EXISTING_FIELD";
export function removeExistingField(fieldData) {
    return {
        type: REMOVE_CATEGORY_EXISTING_FIELD,
        payload:fieldData
    }
}

export const RESTORE_EXISTING_FIELD = "RESTORE_EXISTING_FIELD";
export function restoreExistingField(fieldData) {
    return {
        type: RESTORE_EXISTING_FIELD,
        payload:fieldData
    }
}

export const ADD_CATEGORY_FIELD = "ADD_CATEGORY_FIELD";
export function addField(fieldData) {
    return {
        type: ADD_CATEGORY_FIELD,
        payload:fieldData
    }
}