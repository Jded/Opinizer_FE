import React from 'react'
import {Subheader} from "material-ui"
//import { Router, Route, Link } from 'react-router'

//import {RecentCommentsContainer} from "./../components/comments/containers/RecentCommentsContainer"
//import {RecentItemsContainer} from "./../components/items/containers/RecentItemsContainer"
import RecentCategoriesContainer from "./../components/categories/containers/RecentCategoriesContainer"

class Dashboard extends React.Component {
    constructor(params){
        super(params);
    }

    render() {
        return (
            <div>
                <Subheader>New Categories</Subheader>
                <RecentCategoriesContainer/>
                <Subheader>New Items</Subheader>
                <Subheader>New Comments</Subheader>
            </div>
        )
    }
}

export default Dashboard;