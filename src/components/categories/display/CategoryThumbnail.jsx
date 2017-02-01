'use strict'
import React from 'react'
import {GridTile,IconButton} from 'material-ui'
import { browserHistory } from 'react-router'


class CategoryList extends React.Component {
    constructor(props){
        super(props);
    }

    goToView = ()=>{
        browserHistory.push('/category/' + this.props.data.item_template_id);
    }
    render() {
        const template = this.props.data;
        const address  = template.files.length>0? ("/api/img/" + template.files[0].address + "?dim=450x450") : "/api/img/no-photo.jpg?dim=450x450"
        return (
            <GridTile
                key={template.item_template_id}
                title={template.template_name}
                actionPosition="left"
                titlePosition="top"
                onTouchTap = {this.goToView}
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={1}
                rows={1}
            >
                <img src={address} />
            </GridTile>
        )
    }
}

export default CategoryList;
