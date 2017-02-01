import React from 'react'
import {Subheader} from 'material-ui'
import MyCategoryContainer from "./../../components/categories/containers/MyCategoryContainer"

class UserCategoriesList extends React.Component {
    render() {
        return (
            <div>
                <Subheader>My categories</Subheader>
                <MyCategoryContainer/>
            </div>
        )
    }
}

export default UserCategoriesList;