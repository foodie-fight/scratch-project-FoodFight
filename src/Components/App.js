import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';



class App extends React.Component {

    render() {
        return (
            <div>
                {io.connect('http://localhost:3000')}
            </div>
        )
    }
}


export default App;