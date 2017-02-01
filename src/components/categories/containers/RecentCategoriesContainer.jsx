import { connect } from 'react-redux';
import CategoryList from "../display/CategoryList";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.category.recent,
        multiline: false,
        canDelete: false
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const RecentCategoriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default RecentCategoriesContainer;