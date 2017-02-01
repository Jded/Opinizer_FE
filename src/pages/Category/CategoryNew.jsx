import React from 'react'
import {Subheader} from "material-ui"
import CategoryNewContainer from './../../components/categories/containers/CategoryNewContainer'

class CategoryNew extends React.Component {
    render() {
        return (
            <div>
                <Subheader>Add new category</Subheader>
                <CategoryNewContainer/>
            </div>
        )
    }
}

export default CategoryNew;