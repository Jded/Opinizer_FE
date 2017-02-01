import React from 'react'
import { Subheader,TextField,Divider,Paper, FlatButton , RaisedButton} from 'material-ui'
import { Router, Route, Link } from 'react-router'
import {changeHandler} from "../../forms-common/inputBinder"
import {validateEmail, validatePassword} from "../../../actions/helpers"
import UserAvatar from './../../UserAvatar.jsx'

const center = {
    textAlign:"center"
}

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    segment: {
        maxWidth:500,
        flex: '0 1 auto',
        margin:10,
        padding:10
    }
};

const updateData = ["user_id","email", "login","first_name","last_name", "file_id"];


class UserSettingsEditor extends React.Component {

    changeHandler = changeHandler.bind(this);
    constructor(props){
        super(props);
        this.state = {
            user_id: props.user.loggedUser.user_id,
            file_id: props.user.loggedUser.file_id,
            email: props.user.loggedUser.email,
            oldPassword: "",
            newPassword: "",
            login: props.user.loggedUser.login,
            first_name: props.user.loggedUser.first_name,
            last_name: props.user.loggedUser.last_name,

            newPassword_repeat: "",

            emailError: null,
            oldPasswordError: null,
            newPasswordError: null,
            newPassword_repeatError: null,
            first_nameError: null,
            last_nameError: null,

            file:null
        };
    }


    fileUpdate = (event)=>{
        event.persist();
        let renderImage = (file) => {
            let reader = new FileReader();
            reader.onload = (event2) => {
                let url = event2.target.result;
                this.setState((prevState, props) => Object.assign({}, prevState, {file:file,tempUrl:url}));
            }
            reader.readAsDataURL(file);
        }
        if(event.target.files.length>0){
            renderImage(event.target.files[0]);
        }
    }

    doAvatarChange = ()=>{
        if(this.state.file){
            const filtered = updateData.reduce((result, key) => { result[key] = this.props.user.loggedUser[key]; return result; }, {});
            this.props.doSaveAvatar(filtered,this.state.file);
        }
    }

    doPasswordChange = () => {
        let valid = true;
        let validation = {};
        if(this.state.oldPassword.length == 0){
            valid = false;
            validation.oldPasswordError = "Old password required";
        }
        if(!validatePassword(this.state.newPassword)){
            valid = false;
            validation.newPasswordError = "Needs at least 8 characters, small letters, big letters and numbers";
        }
        if(this.state.newPassword !== this.state.newPassword_repeat){
            valid = false;
            validation.newPassword_repeatError = "Passwords don't match";
        }
        if(valid){
            const filtered = updateData.reduce((result, key) => { result[key] = this.props.user.loggedUser[key]; return result; }, {});
            this.props.doUpdatePassword(filtered,this.state.oldPassword,this.state.newPassword);
        }else{
            console.log(validation)
            this.setState((prevState, props) => Object.assign({}, prevState, validation));
        }
    }

    doSave = () => {
        let valid = true;
        let validation = {};
        if(!validateEmail(this.state.email)){
            valid = false;
            validation.emailError = "Needs valid email";
        }
        if(valid){
            const filtered = updateData.reduce((result, key) => { result[key] = this.state[key]; return result; }, {});
            this.props.doSaveData(filtered);
        }else{
            console.log(validation)
            this.setState((prevState, props) => Object.assign({}, prevState, validation));
        }
    }

    render() {
        return (
            <div style={styles.root}>
                <Paper zDepth={2} style={styles.segment}>
                    <Subheader>Account settings</Subheader>
                    <Divider/>
                    <TextField floatingLabelText="Login *" underlineShow={false} maxLength="32" fullWidth={true} {...this.changeHandler("login","loginError",null)}/>
                    <TextField floatingLabelText="Email address *" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("email","emailError",null)}/>
                    <TextField floatingLabelText="First name" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("first_name","first_nameError",null)}/>
                    <TextField floatingLabelText="Last name" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("last_name","last_nameError",null)}/>
                    <RaisedButton
                        label="Save"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.doSave}
                    />
                </Paper>
                <Paper zDepth={2} style={styles.segment}>
                    <Subheader>Change Password</Subheader>
                    <Divider/>
                    <TextField floatingLabelText="Old password *" type = "password" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("oldPassword","oldPasswordError",null)}/>
                    <TextField floatingLabelText="New password *" type = "password" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("newPassword","newPasswordError",null)}/>
                    <TextField floatingLabelText="Repeat new password *" type = "password" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("newPassword_repeat","newPassword_repeatError",null)}/>
                    <RaisedButton
                        label="Change Password"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.doPasswordChange}
                    />
                </Paper>
                <Paper zDepth={2} style={styles.segment}>
                    <Subheader>Change Picture</Subheader>
                    <Divider/>
                    <div style={center}>
                        <UserAvatar
                            user={this.props.user.loggedUser}
                            tempUrl={this.state.tempUrl}
                            size={400}
                        />
                    </div>
                    <div>
                        <input type="file" onChange={this.fileUpdate}/>
                        <RaisedButton
                            label="Change Avatar"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.doAvatarChange}
                        />
                    </div>
                </Paper>

            </div>

        )
    }
}

export default UserSettingsEditor;