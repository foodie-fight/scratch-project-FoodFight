import React from 'react';
import { render } from 'react-dom';



class Options extends React.Component {



    render() {

        let option = this.props.option
        

        return (
            <div>
                {/* {console.log(this.props)} */}

                
                {option}
                <button type="button" onClick={this.props.onYes}>Yes</button>
                <button type="button" onClick={this.props.onNo}>No</button>

            </div>
        )
    }
}


export default Options;