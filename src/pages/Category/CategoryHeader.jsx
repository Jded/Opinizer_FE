import React from 'react'
import { Router, Route, Link } from 'react-router'

class CategoryHeader extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default CategoryHeader;