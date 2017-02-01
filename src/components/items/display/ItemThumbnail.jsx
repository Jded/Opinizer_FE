'use strict'
import React from 'react'
import {Avatar} from 'material-ui'
import {
    lightWhite,
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';

const stylesSL = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

const stylesML = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

class ItemList extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const template = this.props.data;
        const address  = template.files.length>0? ("/api/img/" + template.files[0].address + "?dim=450x450") : "/api/img/no-photo.jpg?dim=450x450"
        const categoryData = this.props.data;
        return (
            <GridTile
                key={template.img}
                title={template.name}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={template.featured ? 2 : 1}
                rows={template.featured ? 2 : 1}
            >
                <img src={address} />
            </GridTile>
        )
    }
}

export default ItemList;/**
 * Created by Jurek on 30.01.2017.
 */
