import React from 'react'
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import { Router, Route, Link } from 'react-router'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    select(index){this.setState({selectedIndex: index})};

    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Recents"
                        icon={<FontIcon className="material-icons">restore</FontIcon>}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Favorites"
                        icon={<FontIcon className="material-icons">favorite</FontIcon>}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Nearby"
                        icon={<IconLocationOn />}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}


export default Footer;