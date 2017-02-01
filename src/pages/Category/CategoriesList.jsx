import React from 'react'
import {Subheader} from 'material-ui'
import AllCategoryContainer from "./../../components/categories/containers/AllCategoryContainer"

class CategoriesList extends React.Component {
    render() {
        return (
            <div>
                <Subheader>All categories</Subheader>
                <AllCategoryContainer/>
            </div>
        )
    }
}

export default CategoriesList;