import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class Platform extends React.Component {

    constructor() {

        super();

        /*
        initialize our state to have a user socket connection status,
        username
        
        */

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
        this.socket.on('voteCountUpdate', this.voteCountUpdate) //*********
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    connect() {
        this.setState({ status: 'connected', name: 'Will' });
    }

    connected(data) {
        this.setState({ name: data.name });
    }

    voteCountUpdate(data) {
        this.setState({ count: data.count })
    }

    onReturnYes(data) {
        // this.state.count += 1;
        this.setState({ name: data.name, count: data.count })
    }

    onYes() {
        console.log('onYes');
        this.emit('yesVote', { name: 'I Voted' });
    }

    render() {
        return (
            <div>

                <h1>{this.state.name}, {this.state.count}</h1>

                <RadioButtonGroup name="foodTypes" defaultSelected="not_light">

                    <RadioButton
                        value="Mexican"
                        label="Mexican"
                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        style={styles.radioButton}
                        onClick={this.onYes}
                    />


                    <RadioButton
                        value="Italian"
                        label="Italian"
                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        style={styles.radioButton}
                        onClick={this.onYes}
                    />


                    <RadioButton
                        value="Chinese"
                        label="Chinese"
                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                        style={styles.radioButton}
                        onClick={this.onYes}
                    />
                </RadioButtonGroup>
                </div>



        );
    }


}
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

export default Platform;