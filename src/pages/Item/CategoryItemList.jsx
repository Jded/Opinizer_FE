import React from 'react'
import { Router, Route, Link } from 'react-router'

class CategoryItemList extends React.Component {
    render() {
        return (
            <div>Item list for category {this.props.params.categoryId}
            </div>
        )
    }
}

export default CategoryItemList;
