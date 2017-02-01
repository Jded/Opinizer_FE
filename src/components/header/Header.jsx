import React from 'react'
import {AppBar, IconButton, IconMenu, MenuItem, Paper} from 'material-ui'
import UserAvatar from './../UserAvatar.jsx'
import Login from './Login.jsx'
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert.js"
import { Router, Route, Link } from 'react-router'

const style = {"marginTop":"-8px"}

const Logged = (props) => (
    <div>
        Hi, {props.user.loggedUser.login}
        <IconMenu style={style}
            iconButtonElement={
                <IconButton>
                    <UserAvatar
                        user={props.user.loggedUser}
                    />
                </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <Link to="/user/comments"><MenuItem primaryText="My comments" /></Link>
            <Link to="/user/items"><MenuItem primaryText="My items" /></Link>
            <Link to="/user/categories"><MenuItem primaryText="My categories" /></Link>
            <Link to="/user/settings"><MenuItem primaryText="Account Settings" /></Link>
            {props.user.loggedUser.admin_privilege?
                (<Link to="/admin/users"><MenuItem primaryText="Users" /></Link>)
            :null}
            <MenuItem primaryText="Sign out" onTouchTap={props.doLogout}/>
        </IconMenu>
    </div>
);
Logged.muiName = 'IconMenu';

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Paper zDepth={1}>
                <div>
                    <AppBar
                        title="Opinizer 0.1"
                        iconElementLeft={
                            <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <Link to="/"><MenuItem primaryText = "Dashboard" /></Link>
                                <Link to="/categories"><MenuItem primaryText = "All categories" /></Link>
                                {this.props.user.loggedUser ?<Link to="/newCategory"><MenuItem primaryText = "New category" /></Link>:null}
                            </IconMenu>}
                        iconElementRight={this.props.user.loggedUser ? <Logged {...this.props}/> : <Login {...this.props} />}
                    />
                </div>
            </Paper>
        )
    }
}

export default Header;