import React from 'react'
import {Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui';
import {Snackbar} from 'material-ui';

import { Router, Route, Link } from 'react-router'

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const hasMessage = this.props.message && this.props.message[0]
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <Link to="/"><ToolbarTitle text = "Dashboard" /></Link>
                        <Link to="/categories"><ToolbarTitle text = "All categories" /></Link>
                        {this.props.user.loggedUser ?<Link to="/newCategory"><ToolbarTitle text = "New category" /></Link>:null}
                    </ToolbarGroup>
                </Toolbar>
                    <Snackbar
                        open={hasMessage?true:false}
                        message={hasMessage?this.props.message[0]:"No message"}
                        autoHideDuration={4000}
                        onRequestClose={this.handleMessageClose}
                    />
            </div>
        );
    }
}


export default Footer;