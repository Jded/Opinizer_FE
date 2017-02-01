'use strict'
import React from 'react'
import {GridList} from 'material-ui'
import CategoryThumbnail from "./CategoryThumbnail"
const stylesML = {
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

const stylesSL = {
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

class CategoryList extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const styles = this.props.multiline?stylesML:stylesSL;
        const categoryData = this.props.data;
        return (
            <div style={styles.root}>
                <GridList
                    cols={2.2}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}
                >
                    {categoryData.map((category) => (
                        <CategoryThumbnail data = {category} key={category.item_template_id}/>
                    ))}
                </GridList>
            </div>
        )
    }
}

export default CategoryList;