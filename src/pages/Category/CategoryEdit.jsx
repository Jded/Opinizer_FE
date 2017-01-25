import React from 'react'
import { Router, Route, Link } from 'react-router'

class CategoryEdit extends React.Component {
    render() {
        return (
            <div>
                Edit category {this.props.params.categoryId}
            </div>
        )
    }
}

export default CategoryEdit;