import { connect } from 'react-redux';
import CategoryEdit from "../edit/CategoryEdit";
import {addField, doUpdateCategory, removeNewField, removeExistingField, restoreExistingField} from "../../../actions/category";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.category.single,
        hasBeenStored:false,
        allowed:["addFields","creation_date","file_id","item_template_id","removeFields","user_id"]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addField: (field) => {
            dispatch(addField(field))
        },
        removeNewField: (field) => {
            dispatch(removeNewField(field))
        },
        removeExistingField: (field) => {
            dispatch(removeExistingField(field))
        },
        restoreExistingField: (field) => {
            dispatch(restoreExistingField(field))
        },
        store: (category, files) => {
            dispatch(doUpdateCategory(category, files))
        },
    }
}

const CategoryEditContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)

export default CategoryEditContainer