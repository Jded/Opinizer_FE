import { connect } from 'react-redux';
import Footer from "./Footer";
import {removeError,removeMessage} from "./../../actions/message";


const mapStateToProps = (state) => {
    return {
        message: state.message,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeMessage: (index) => {
            dispatch(removeMessage(index))
        }
    }
}

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)

export default FooterContainer