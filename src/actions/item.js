import {BE_ADDR} from "./../constants.js";
import {ADD_MESSAGE} from "./message";
import {parseJsonResponse} from "./helpers.js";

export const GET_ITEMS_REPLY = 'GET_ITEMS_REPLY';

function getItemsSuccess(collection,categoryData) {
    return {
        type: GET_CATEGORIES_REPLY,
        payload:{collection,categoryData}
    }
}

function getItemsFailure(collection,error) {
    return {
        type: GET_CATEGORIES_REPLY,
        error:true,
        payload:error
    }
}

export const GET_ITEMS = 'GET_ITEMS';
function getItemsStart(collection){
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

export const GET_ITEM = 'GET_ITEM';
function getItemStart(){
    return {
        type: GET_ITEM
    }
}

export const GET_ITEM_REPLY = 'GET_ITEM_REPLY';
function getItemSuccess(categoryData){
    return {
        type: GET_ITEM_REPLY,
        payload:categoryData
    }
}

function getItemFailure(error){
    return {
        type: GET_ITEM_REPLY,
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

export function getRecentItems(number){
    return function (dispatch) {
        dispatch(getItemsStart("recent"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template/recent/"+number,options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getItemsSuccess("recent",json))
            ).catch(error=>
                dispatch(getItemsFailure("recent",error))
            )
    }
}

export function getMyItems(){
    return function (dispatch) {
        dispatch(getItemsStart("my"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item_template/my",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getItemsSuccess("my", json))
            ).catch(error=>
                dispatch(getItemsFailure("my", error))
            )
    }
}

export function getCategoryItems(item_template_id){
    return function (dispatch) {
        dispatch(getItemsStart("all"))
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template",options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getItemsSuccess("all",json))
            ).catch(error=>
                dispatch(getItemsFailure("all",error))
            )
    }
}

export function getItem(categoryId){
    return function (dispatch) {
        dispatch(getItemStart())
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        return fetch(BE_ADDR + "/item-template/" + categoryId,options)
            .then(parseJsonResponse)
            .then(json =>
                dispatch(getItemSuccess(json))
            ).catch(error=>{
                dispatch(getItemFailure(json))
            })
    }
}

function addNewFiles(files,fileData) {
    if(files.length==0){
        console.log('fd',fileData);
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
            categoryData.file_id = [].concat(fileData.map((file)=>{console.log(file);return file.file_id}));
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

export function doUpdateCategory(categoryData,newFiles){

    return function (dispatch) {
        dispatch(categoryUpdateStart())

        addNewFiles(newFiles,[]).then((fileData)=>{
            console.log('here',fileData);
            let existing_files = categoryData.file_id?categoryData.file_id:[];
            categoryData.file_id = [].concat(existing_files,fileData.map((file)=>{console.log('file',file);return file.file_id}));
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
