import React from 'react'
import SingleCategoryViewContainer from "./../../components/categories/containers/SingleCategoryViewContainer"
import {Subheader} from "material-ui"

class CategoryView extends React.Component {
    render() {
        return (
            <div>
                <Subheader>View category</Subheader>
                <SingleCategoryViewContainer/>
            </div>
        )
    }
}

export default CategoryView;