'use strict'
import React from 'react'
import { Subheader, TextField, Divider, Paper, Chip, RaisedButton, SelectField, MenuItem} from 'material-ui'
import {changeHandler} from "../../forms-common/inputBinder"
import {browserHistory} from 'react-router'

const center = {
    textAlign:"center"
}

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    segment: {
        flex: '1 1 auto',
        margin:10,
        padding:10
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    image: {
        width: '100%'
    }
};

class CategoryEdit extends React.Component {
    tempIndex = -1
    changeHandler = changeHandler.bind(this);
    constructor(props){
        super(props);
        this.state = {
            template_name:this.props.data.template_name,
            template_description:this.props.data.template_description?this.props.data.template_description:"",

            template_nameError:"",
            template_descriptionError:"",

            file_id: [],

            file:null,
            tempUrl:null,

            currentFieldType: 1,
            currentFieldTypeError: "",
            currentFieldName:"",
            currentFieldNameError:""
        };
    }


    fileUpdate = (event)=>{
        event.persist();
        let renderImage = (file) => {
            let reader = new FileReader();
            reader.onload = (event2) => {
                let url = event2.target.result;
                this.setState((prevState, props) => Object.assign({}, prevState, {file:file,tempUrl:url}));
            }
            reader.readAsDataURL(file);
        }
        if(event.target.files.length>0){
            renderImage(event.target.files[0]);
        }
    }


    doSave = () => {
        let valid = true;
        let validation = {};
        if(!this.state.template_name){
            valid = false;
            validation.emailError = "Template name required";
        }
        if(valid){
            let files = this.state.file?[this.state.file]:[];
            let localChanges = {
                template_name: this.state.template_name,
                template_description: this.state.template_description
            }
            const filtered = this.props.allowed.reduce((result, key) => { result[key] = this.props.data[key]; return result; }, localChanges);
            this.props.store(filtered,files);
        }else{
            this.setState((prevState, props) => Object.assign({}, prevState, validation));
        }
    }

    translateType = {
        1: "Text",
        2: "Integer",
        3: "Decimal",
        4: "Date"
    }

    handleExistingFieldDelete = (field) => {
        this.props.removeExistingField(field);
    }

    handleExistingFieldRestore = (field) => {
        this.props.restoreExistingField(field);
    }

    handleNewFieldDelete = (field) => {
        this.props.removeNewField(field);
    }
    handleNewFieldAdd = () => {
        if(!this.state.currentFieldName){
            this.setState((prevState, props) => Object.assign({}, prevState, {currentFieldNameError: "Name is required"}));
            return;
        }
        let field = {
            item_field_id:String(this.tempIndex--),
            item_template_id:this.props.data.item_template_id,
            field_type:this.state.currentFieldType,
            field_name:this.state.currentFieldName
        }
        this.props.addField(field);
    }

    currentFieldTypeChange = (event, index, value) => this.setState((prevState, props) => Object.assign({}, prevState, {currentFieldType: value}));

    componentWillReceiveProps(nextProps){
        if(nextProps.hasBeenStored){
            browserHistory.push('/category/' + nextProps.data.item_template_id);
            return null;
        }
    }

    render(){
        const template = this.props.data;
        if(!template){return null;}        
        const address  = template.files.length>0? ("/api/img/" + template.files[0].address + "?dim=450x450") : "/api/img/no-photo.jpg?dim=600x300"
        return (
            <div style={styles.root}>
                <Paper zDepth={2} style={styles.segment}>
                    <Subheader>Category settings</Subheader>
                    <Divider/>
                    <TextField floatingLabelText="Category name" underlineShow={false} maxLength="64" fullWidth={true} {...this.changeHandler("template_name","template_nameError",null)}/>
                    <TextField floatingLabelText="Category description" underlineShow={false} multiLine={true} rows={6} fullWidth={true} {...this.changeHandler("template_description","template_descriptionError",null)}/>
                    <Subheader>Change Picture</Subheader>
                    <Divider/>
                    <div style={center}>
                        <Paper zDepth={4}>
                            <img style={styles.image} src={this.state.tempUrl?this.state.tempUrl:address} />
                        </Paper>
                    </div>
                    <div>
                        <input type="file" onChange={this.fileUpdate}/>
                    </div>
                    <RaisedButton
                        label="Save"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.doSave}
                    />
                </Paper>
                <Paper zDepth={2} style={styles.segment}>
                    <Subheader>Fields</Subheader>
                    <Divider/>
                    <div style={styles.root}>
                        <SelectField
                            style={styles.segment}
                            floatingLabelText="Field type"
                            value={this.state.currentFieldType}
                            onChange={this.currentFieldTypeChange}
                        >
                            <MenuItem value={1} primaryText={this.translateType[1]} />
                            <MenuItem value={2} primaryText={this.translateType[2]} />
                            <MenuItem value={3} primaryText={this.translateType[3]} />
                            <MenuItem value={4} primaryText={this.translateType[4]} />
                        </SelectField>
                        <TextField style={styles.segment} floatingLabelText="File name" underlineShow={false} fullWidth={false} {...this.changeHandler("currentFieldName","currentFieldNameError",null)}/>
                        <RaisedButton
                            style={styles.segment}
                            label="Add field"
                            primary={false}
                            keyboardFocused={true}
                            onTouchTap={this.handleNewFieldAdd}
                        />
                    </div>
                    <Subheader>Existing fields</Subheader>
                    <div style = {styles.wrapper}>
                        {template.fields.map((field) => (
                            <Chip
                                key = {field.item_field_id}
                                onRequestDelete={() => this.handleExistingFieldDelete(field)}
                                style={styles.chip}
                            >
                                {field['field_name']} {"(" + this.translateType[field.field_type] + ")"}
                            </Chip>
                        ))}
                        {template.fields.length == 0 ? <span>Empty</span>:null}
                    </div>
                    <Subheader>Added fields</Subheader>
                    <div style = {styles.wrapper}>
                        {template.addFields.map((field,index) => (
                            <Chip
                                key = {field.item_field_id}
                                onRequestDelete={() => this.handleNewFieldDelete(field)}
                                style={styles.chip}
                            >
                                {field['field_name']} {"(" + this.translateType[field.field_type] + ")"}
                            </Chip>
                        ))}
                        {template.addFields.length == 0 ? <span>Empty</span>:null}
                    </div>
                    <Subheader>To be removed</Subheader>
                    <div style = {styles.wrapper}>
                        {template.removeFields.map((field) => (
                            <Chip
                                key = {field.item_field_id}
                                onRequestDelete={() => this.handleExistingFieldRestore(field)}
                                style={styles.chip}
                            >
                                {field['field_name']} {"(" + this.translateType[field.field_type] + ")"}
                            </Chip>
                        ))}
                        {template.removeFields.length == 0 ? <span>Empty</span>:null}
                    </div>
                </Paper>
            </div>
        )
    }
}

export default CategoryEdit;