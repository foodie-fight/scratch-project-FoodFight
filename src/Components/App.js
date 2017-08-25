import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Options from './Options.js'



class App extends React.Component {

    render() {
        return (
            <div>
                <Options />
            </div>
        )
    }
}


export default App;