import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Test from './Test.js';



class App extends Component {

    render() {

        return (
            <div>
                <Test/>
            </div>
        )
    }
}


export default App;
