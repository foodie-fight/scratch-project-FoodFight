import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';


class Test extends React.Component {

    constructor(){

        super();

        this.state = {
            status: 'disconnected',
            name: 'Warda',
            count: 0,
            }
        this.connect = this.connect.bind(this);
        this.connected = this.connected.bind(this);
        this.onYes = this.onYes.bind(this);
        this.emit = this.emit.bind(this);
        this.onReturnYes = this.onReturnYes.bind(this);
        this.voteCountUpdate = this.voteCountUpdate.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('connected', this.connected)
        this.socket.on('onYes', this.onYes)
        this.socket.on('onReturnYes', this.onReturnYes);
        this.socket.on('yesVote', this.voteCountUpdate)
    }

    emit(event, data){
        this.socket.emit(event, data);
    }

    connect() {
        this.setState({ status: 'connected', name: 'Will'});
        console.log('hellooo');
    }

    connected(data) {
        this.setState({ name: data.name });       
    }

    voteCountUpdate() {
        this.state.count++
    }

    onReturnYes(data){
        console.log('onReturnYes', this.state.count);
        this.state.count += 1;
        this.setState({ name: data.name })
        
    }

    
    onYes(){
        console.log('onYes');
        this.emit('yesVote', {name: 'I Voted'});       
    }
    render() {
        return(
            <div>

                <h1>{this.state.name}, {this.state.count}</h1>
                <button type="button" onClick={this.onYes}>Yes</button>
            </div>
        );
    }


}

export default Test;