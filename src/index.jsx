
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from "./pages/Routes.jsx";

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();


ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}>
    <Routes/>
</MuiThemeProvider>, document.getElementById('hello'));
