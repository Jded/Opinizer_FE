import { connect } from 'react-redux';
import Register from "../edit/Register";
import {doRegister} from "../../../actions/user";


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doRegister: (userData) => {
            dispatch(doRegister(userData))
        }
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default RegisterContainer