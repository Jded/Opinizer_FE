import { connect } from 'react-redux';
import ItemList from "../display/ItemList";


const mapStateToProps = (state) => {
    /*return {
        user: state.user
    }*/
}
const mapDispatchToProps = (dispatch) => {
    /*return {
        doRegister: (userData) => {
            dispatch(doRegister(userData))
        }
    }*/
}

const CategoryItemsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList)

export default CategoryItemsContainer