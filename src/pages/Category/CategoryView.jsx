import React from 'react'
import { Router, Route, Link } from 'react-router'

class CategoryView extends React.Component {
    render() {
        return (
            <div>View category {this.props.params.categoryId}
            </div>
        )
    }
}

export default CategoryView;