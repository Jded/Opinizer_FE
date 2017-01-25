import React from 'react'
import {AppBar, Toggle, IconMenu, MenuItem, Paper, IconButton} from 'material-ui'
import {NavigationClose} from 'material-ui/svg-icons'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert.js'
import Login from './Login.jsx'
import { Router, Route, Link } from 'react-router'

const Logged = (props) => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <Link to="/user/settings"><MenuItem primaryText="Settings" /></Link>
        <MenuItem primaryText="Sign out" onTouchTap={props.doLogout}/>
    </IconMenu>
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
                        title="Title"
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        iconElementRight={this.props.user.loggedUser ? <Logged {...this.props}/> : <Login {...this.props} />}
                    />
                </div>
            </Paper>
        )
    }
}

export default Header;