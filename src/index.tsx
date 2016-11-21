import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import * as React from "react";
import * as ReactDOM from "react-dom";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Hello } from "./components/Hello";

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Hello compiler="TypeScript" framework="React" />
    </MuiThemeProvider>,
    document.getElementById("example")
);