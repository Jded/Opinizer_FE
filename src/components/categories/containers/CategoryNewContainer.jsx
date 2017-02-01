import { connect } from 'react-redux';
import CategoryEdit from "../edit/CategoryEdit";
import {addField, doSaveCategory, removeNewField} from "../../../actions/category";

const mapStateToProps = (state) => {

    return {
        user: state.user,
        data: state.category.single,
        hasBeenStored: state.category.isStored,
        allowed:["addFields","file_id"]
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
        store: (category, files) => {
            dispatch(doSaveCategory(category, files))
        },
    }
}

const CategoryNewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit)

export default CategoryNewContainer