import React from 'react'
import {Subheader} from "material-ui";
import CategoryEditContainer from "./../../components/categories/containers/CategoryEditContainer"

class CategoryEdit extends React.Component {
    render() {
        return (
            <div>
                <Subheader>Edit category</Subheader>
                <CategoryEditContainer/>
            </div>
        )
    }
}

export default CategoryEdit;