import React from 'react'
import { Subheader,TextField,Divider,Paper, FlatButton } from 'material-ui'
import {validateEmail, validatePassword, validateLogin} from "./../../actions/helpers"
import {changeHandler} from "./../../components/forms/inputBinder"

const style = {
    "maxWidth": 600,
    "margin":"0 auto",
    padding: 10
}
const buttonStyle = {
    "textAlign":"right",
    padding: "10px 0"
}

const registrationData = ["email", "password", "login","first_name","last_name"];

class Register extends React.Component {

    state = {
        email: "",
        password: "",
        login: "",
        first_name: "",
        last_name: "",

        password_repeat: "",

        emailError: null,
        passwordError: null,
        password_repeatError: null,
        loginError: null,
        first_nameError: null,
        last_nameError: null,

        hasRegistered: false
    };

    changeHandler = changeHandler.bind(this);

    doRegister = () => {
        let valid = true;
        let validation = {};
        if(!validatePassword(this.state.password)){
            valid = false;
            validation.passwordError = "Needs at least 8 characters, small letters, big letters and numbers";
        }
        if(!validateEmail(this.state.email)){
            valid = false;
            validation.emailError = "Needs valid email";
        }
        if(this.state.password !== this.state.password_repeat){
            valid = false;
            validation.password_repeatError = "Passwords don't match";
        }

        (this.state.login.length == 0? Promise.resolve({ok:false}): validateLogin(this.state.login)).then((response)=>{
            if(!response.ok){
                validation.loginError = "Login taken";
                valid = false;
            }
            if(valid){
                const filtered = registrationData.reduce((result, key) => { result[key] = this.state[key]; return result; }, {});
                this.props.doRegister(filtered);
            }else{
                console.log(validation)
                this.setState((prevState, props) => Object.assign({}, prevState, validation));
            }
        })
    }

    render() {
        const registrationSuccessful = this.props.user.justRegistered;
        return (
            <div>
                {registrationSuccessful ? (
                    <Paper zDepth={2} style={style}>
                        <Subheader>Registration successful</Subheader>
                        <span>You can log in now. You won't be able to add content until admin activates account.</span>
                    </Paper>
                    ) : (
                        <Paper zDepth={2} style={style}>
                            <Subheader>Create account</Subheader>
                            <TextField floatingLabelText="Login *" underlineShow={false} maxLength="32" fullWidth={true} {...this.changeHandler("login","loginError",null)}/>
                            <TextField floatingLabelText="Email address *" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("email","emailError",null)}/>
                            <TextField floatingLabelText="Password *" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("password","passwordError",null)}/>
                            <TextField floatingLabelText="Repeat password *" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("password_repeat","password_repeatError",null)}/>
                            <TextField floatingLabelText="First name" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("first_name","first_nameError",null)}/>
                            <TextField floatingLabelText="Last name" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("last_name","last_nameError",null)}/>
                            <Divider/>
                            <div style={buttonStyle}>
                                <FlatButton
                                    label="Register"
                                    primary={true}
                                    keyboardFocused={true}
                                    onTouchTap={this.doRegister}
                                />
                            </div>
                        </Paper>
                    )}
            </div>

        )
    }
}

export default Register;