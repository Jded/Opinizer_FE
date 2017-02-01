import { connect } from 'react-redux';
import CategoryList from "../display/CategoryList";
import {doRegister} from "../../../actions/user";


const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.category.all,
        multiline: true,
        canDelete: false
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const AllCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default AllCategoryContainer