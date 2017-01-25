import React from 'react'
import { Router, Route, Link } from 'react-router'

class ItemHeader extends React.Component {
    render() {
        return (
            <div> Item header
                {this.props.children}
            </div>
        )
    }
}

export default ItemHeader;