import React from 'react'
import { Router, Route, Link } from 'react-router'

class ItemView extends React.Component {
    render() {
        return (
            <div> New item of category {this.props.params.itemId}
            </div>
        )
    }
}

export default ItemView;