import React from 'react'
import {Dialog, FlatButton, TextField} from 'material-ui'
import { Link } from 'react-router'
import {changeHandler} from "./../forms/inputBinder"

class Login extends React.Component {

    state = {
        open: false,
        email: "",
        password: "",
        emailError:null,
        passwordError:null
    };

    handleOpen = () => {
        this.setState((prevState, props) => Object.assign({}, prevState, {open: true}));
    };

    handleClose = () => {
        this.setState((prevState, props) => Object.assign({}, prevState, {open: false}));
    };

    doLogin = () => {
        let valid = true;
        let validation = {};
        if(this.state.email.length == 0 ){
            valid = false;
            validation.emailError = "Required";
        }
        if(this.state.password.length == 0){
            valid = false;
            validation.passwordError = "Required";
        }
        if(valid){
            this.props.doLogin(this.state.email,this.state.password);
        }else{
            this.setState((prevState, props) => Object.assign({}, prevState, validation));
        }
    }

    changeHandler = changeHandler.bind(this);

    render() {
        const actions = [
            <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.doLogin}
            />,
            <Link to="/register">
                <FlatButton label="Register" onTouchTap={this.handleClose}/>
            </Link>
        ];

        return (
            <div>
                <FlatButton label="Login" onTouchTap={this.handleOpen}/>
                <Dialog
                    title="Login"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Enter email"
                        floatingLabelText="Email"
                        {...this.changeHandler("email","emailError",null)}
                        fullWidth={true}
                    />
                    <br />
                    <TextField
                        hintText="Enter password"
                        floatingLabelText="Password"
                        type="password"
                        {...this.changeHandler("password","passwordError",null)}
                        fullWidth={true}
                    />
                </Dialog>
            </div>

        );
    }
}
Login.muiName = 'FlatButton';
export default Login;