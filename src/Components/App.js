import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Platform from './Platform.js'



class App extends React.Component {

    render() {

        return (
            <div>
                <Platform/>
            </div>
        )
    }
}


export default App;