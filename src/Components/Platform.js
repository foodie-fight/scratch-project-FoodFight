import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Options from './Options.js'
import Results from './Results.js'



class Platform extends React.Component {
    
    constructor() {

        super();

        this.state = {
            options : [{'category': 'Chinese'}, {'category': 'Japense'}, {'category': 'Mexican'}, {'category': 'Italian'}]
        }

        this.onYes = this.onYes.bind(this);
        this.onNo = this.onNo.bind(this);
    }

    onYes() {
        console.log('pressed yes')
        //we are going to increment counter of the current choice
        io.on('event', function(){
            console.log('asdf')
        })
    }

    onNo() {
        console.log('pressed no')
    }

    render() {


        const optionItems = this.state.options.map((option, index) => {
            return <Options option={option.category} key={index} onYes={this.onYes} onNo = {this.onNo}/>
        })

        return (
            <div>
                <Results/>

                {optionItems}


            </div>
        )
    }
}


export default Platform;