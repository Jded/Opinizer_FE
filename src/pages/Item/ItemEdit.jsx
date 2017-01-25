import React from 'react'
import { Router, Route, Link } from 'react-router'

class ItemEdit extends React.Component {
    render() {
        return (
            <div>
                Edit item {this.props.params.itemId}
            </div>
        )
    }
}

export default ItemEdit;