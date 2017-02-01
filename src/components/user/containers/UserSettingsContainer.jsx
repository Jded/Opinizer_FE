import { connect } from 'react-redux';
import UserSettingsEditor from "../edit/UserSettingsEditor";
import {doSaveAvatar,doSaveData,doUpdatePassword} from "../../../actions/user";


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doSaveData: (userData) => {
            dispatch(doSaveData(userData))
        },
        doSaveAvatar: (userData,file) => {
            dispatch(doSaveAvatar(userData,file))
        },
        doUpdatePassword: (userData,oldPassword,newPassword) => {
            dispatch(doUpdatePassword(userData,oldPassword,newPassword))
        }
    }
}

const UserSettingsEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSettingsEditor)

export default UserSettingsEditorContainer