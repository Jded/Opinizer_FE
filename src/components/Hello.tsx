import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <h1>Test kompilator: {this.props.compiler} Framework: {this.props.framework}! Material component: <RaisedButton label="Material Test" /> </h1>);
    }
}