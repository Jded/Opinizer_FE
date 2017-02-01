'use strict'
import React from 'react'
import {Card,CardMedia,CardHeader,CardText,CardTitle,CardActions,FlatButton} from 'material-ui'
import { browserHistory } from 'react-router'

const style = {
    maxWidth: 800,
    margin:" 0 auto"
}

class SingleCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        };
    }

 /*   goToView = ()=>{
        browserHistory.push('/category/' + this.props.data.item_template_id);
    }*/
    /*render() {

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
    }*/

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    goToEdit = () => {
        browserHistory.push('/category/' + this.props.data.item_template_id + '/edit');
    }

    deleteCategory = () => {
        this.props.delete(this.props.data.item_template_id);
        browserHistory.push('/');
    }

    render() {
        const template = this.props.data;
        const user = this.props.user.loggedUser;
        if(!template){
            return null;
        }
        const addressSmall  = template.files.length>0? ("/api/img/" + template.files[0].address + "?dim=450x450") : "/api/img/no-photo.jpg?dim=450x450";
        const addressBig  = template.files.length>0? ("/api/img/" + template.files[0].address) : "/api/img/no-photo.jpg";
        const ownerOrAdmin = user?(template.user_id == user.user_id || user.admin_privilege):false;
        return (
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={style}>
                <CardHeader
                    title={template.template_name}
                    subtitle={"17 items"}
                    avatar={addressSmall}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardMedia
                    expandable={true}
                    overlay={<CardTitle title={template.template_name} subtitle={"17 items"} />}
                >
                    <img src={addressBig} />
                </CardMedia>
                <CardText expandable={true}>
                    {template.template_description}
                </CardText>
                {ownerOrAdmin?(
                        <CardActions>
                            <FlatButton label="Edit" onTouchTap={this.goToEdit} />
                            <FlatButton label="Delete" onTouchTap={this.deleteCategory} />
                        </CardActions>
                    ):null
                }
            </Card>
        );
    }
}

export default SingleCategory;
