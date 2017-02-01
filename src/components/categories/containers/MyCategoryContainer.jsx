import { connect } from 'react-redux';
import CategoryList from "../display/CategoryList";
import {deleteCategory} from "../../../actions/category";


const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.category.my,
        multiline: true,
        canDelete: true
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete: (item_template_id) => {
            dispatch(deleteCategory(item_template_id))
        }
    }
}

const AllCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default AllCategoryContainer