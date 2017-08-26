import React from 'react';
import { render } from 'react-dom';



class Options extends React.Component {



    render() {

        let option = this.props.option
        

        return (
            <div>
                {/* {console.log(this.props)} */}

                
                <button type="button" onClick={this.props.onYes}>{option}</button>


            </div>
        )
    }
}


export default Options;