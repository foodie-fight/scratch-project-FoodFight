import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
// import Platform from './Platform.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Jumbotron } from 'react-bootstrap';
import Test from './Test.js';




class App extends Component {

    render() {

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <Jumbotron>
                      <Test />
                    </Jumbotron>

                    {/* <Platform /> */}
                </MuiThemeProvider>
               
            </div>
        )
    }
}


export default App;
