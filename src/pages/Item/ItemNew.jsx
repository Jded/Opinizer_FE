import React from 'react'
import { Router, Route, Link } from 'react-router'

class ItemNew extends React.Component {
    render() {
        return (
            <div> New item of category {this.props.params.categoryId}
            </div>
        )
    }
}

export default ItemNew;