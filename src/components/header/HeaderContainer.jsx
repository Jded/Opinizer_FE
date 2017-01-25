import { connect } from 'react-redux';
import Header from "./Header";
import {createSession, deleteSession} from "./../../actions/user";


const mapStateToProps = (state) => {
    console.log('work',state)
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (email,password) => {
            dispatch(createSession(email,password))
        },
        doLogout: () => {
            dispatch(deleteSession())
        }
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer