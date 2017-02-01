/**
 * Created by Jurek on 23.01.2017.
 */
import React from 'react'
import { Router, Route, Link } from 'react-router'

class UserItemList extends React.Component {
    render() {
        return (
            <div>Item list wwith mode {this.props.params.mode}
            </div>
        )
    }
}

export default UserItemList;
