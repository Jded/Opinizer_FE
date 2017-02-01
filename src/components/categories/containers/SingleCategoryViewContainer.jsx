import { connect } from 'react-redux';
import SingleCategory from "../display/SingleCategory";
import {deleteCategory} from "../../../actions/category";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.category.single
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete: (item_template_id) => {
            dispatch(deleteCategory(item_template_id))
        }
    }
}

const SingleCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleCategory)

export default SingleCategoryContainer