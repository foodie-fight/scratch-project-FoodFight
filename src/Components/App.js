import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Platform from './Platform.js';




class App extends React.Component {

    render() {

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                  
                      {/* <Test /> */}
              

                     <Platform /> 
                </MuiThemeProvider>
               
            </div>
        )
    }
}


export default App;
