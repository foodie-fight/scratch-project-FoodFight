import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Test from './Test.js';
import Platform from './Platform.js'



class App extends Component {

    render() {

        return (
            <div>
                <Test/>
                <Platform/>
            </div>
        )
    }
}


export default App;
