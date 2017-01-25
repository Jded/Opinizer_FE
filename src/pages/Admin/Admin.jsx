import React from 'react'
import { Router, Route, Link } from 'react-router'

class Admin extends React.Component {
    render() {
        return (
            <div> Adminheader
                {this.props.children}
            </div>
        )
    }
}

export default Admin;