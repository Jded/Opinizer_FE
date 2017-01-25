import React from 'react'
import { Link } from 'react-router'
import {Paper} from 'material-ui'

import HeaderContainer from "../components/header/HeaderContainer";
import Footer from "./../components/Footer";


const style = {
    margin: "10px 0",
    padding: 5
}

class Main extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <Paper zDepth={1} style={style}>
                    {this.props.children}
                </Paper>
                <Footer/>
            </div>
        )
    }
}

export default Main;