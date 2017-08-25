import React from 'react';
import { render } from 'react-dom';



class Options extends React.Component {

    render() {
        return (
            <div>
                Italian
                <button type="button">Yes</button>
                <button type="button">No</button>

            </div>
        )
    }
}


export default Options;