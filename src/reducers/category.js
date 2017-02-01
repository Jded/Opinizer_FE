
import {ADD_CATEGORY_FIELD,GET_CATEGORIES,GET_CATEGORIES_REPLY,GET_CATEGORY,GET_CATEGORY_REPLY,REMOVE_CATEGORY_EXISTING_FIELD,REMOVE_CATEGORY_NEW_FIELD, DELETE_CATEGORY, DELETE_CATEGORY_REPLY, UPDATE_CATEGORY, UPDATE_CATEGORY_REPLY, RESTORE_EXISTING_FIELD, NEW_CATEGORY} from "./../actions/category"

const category = (state = {"my":[],"all":[],"recent":[], "single":null, isStored:false}, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return Object.assign({}, state,
                {[action.payload.collection]:[]}
            )
        case GET_CATEGORIES_REPLY:
            if(!action.error){
                return Object.assign({}, state,
                    {[action.payload.collection]:action.payload.categoryData}
                )
            }else{
                return state;
            }
        case GET_CATEGORY:
            return Object.assign({}, state,
                {single:null}
            )
        case GET_CATEGORY_REPLY:
            if(!action.error){
                return Object.assign({}, state,
                    {single: Object.assign({}, action.payload, {
                        addFields: [],
                        removeFields:[]
                    }), isStored: true}
                )
            }else{
                return state;
            }
        case UPDATE_CATEGORY:
            return Object.assign({}, state,
                {single:null}
            )
        case UPDATE_CATEGORY_REPLY:
            if(!action.error){
                return Object.assign({}, state,
                    {single: Object.assign({}, action.payload, {
                        addFields: [],
                        removeFields:[]
                    }), isStored:true}
                )
            }else{
                return state;
            }
        case NEW_CATEGORY:
            return Object.assign({}, state,
                {single: Object.assign({}, action.payload, {
                    template_name: "",
                    template_description: "",
                    fields: [],
                    file_id:[],
                    addFields: [],
                    removeFields:[],
                    files:[]
                }), isStored:false}
            )
        case REMOVE_CATEGORY_NEW_FIELD:
            return Object.assign({}, state,
                {single: Object.assign({}, state.single, {
                    addFields: state.single.addFields.filter((field)=>field.item_field_id != action.payload.item_field_id),
                })}
            )
        case REMOVE_CATEGORY_EXISTING_FIELD:
            return Object.assign({}, state,
                {single: Object.assign({}, state.single, {
                    fields: state.single.fields.filter((field)=>field.item_field_id != action.payload.item_field_id),
                    removeFields: [].concat(state.single.removeFields,[action.payload])
                })}
            )
        case RESTORE_EXISTING_FIELD:
            return Object.assign({}, state,
                {single: Object.assign({}, state.single, {
                    fields: [].concat(state.single.fields,[action.payload]),
                    removeFields: state.single.removeFields.filter((field)=>field.item_field_id != action.payload.item_field_id)
                })}
            )
        case ADD_CATEGORY_FIELD:
            return Object.assign({}, state,
                {single: Object.assign({}, state.single, {
                    addFields: [].concat(state.single.addFields,[action.payload])
                })}
            )
        case DELETE_CATEGORY:
            return state;
        case DELETE_CATEGORY_REPLY:
            if(!action.error){
                return Object.assign({}, state,
                    {my: state.my.filter((category)=>category.item_template_id != action.payload),
                    recent:state.recent.filter((category)=>category.item_template_id != action.payload),
                    all:state.all.filter((category)=>category.item_template_id != action.payload)}
                )
            }else{
                return state;
            }
        default:
            return state
    }
}

export default category;