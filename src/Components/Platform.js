import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { Jumbotron } from 'react-bootstrap';

class Platform extends React.Component {

    constructor() {
        super();
        this.state = {
            image: '',
            status: 'disconnected',
            Option1: 'Chinese',
            Option2: 'Japanese',
            Option3: 'Mexican',
            Option4: 'Italian',
            count4Chinese: 0,
            count4Japanese: 0,
            count4Mexican: 0,
            count4Italian: 0,
            winner: '... hmm what should we eat?',
        }
        this.connected = this.connected.bind(this);
        this.emit = this.emit.bind(this);
        this.updateState = this.setState.bind(this);
        this.onChinese = this.onChinese.bind(this);
        this.onReturnYesChinese = this.onReturnYesChinese.bind(this);
        this.voteCountUpdateChinese = this.voteCountUpdateChinese.bind(this);
        this.onJapanese = this.onJapanese.bind(this);
        this.onReturnYesJapanese = this.onReturnYesJapanese.bind(this);
        this.voteCountUpdateJapanese = this.voteCountUpdateJapanese.bind(this);
        this.onMexican = this.onMexican.bind(this);
        this.onReturnYesMexican = this.onReturnYesMexican.bind(this);
        this.voteCountUpdateMexican = this.voteCountUpdateMexican.bind(this);
        this.onItalian = this.onItalian.bind(this);
        this.onReturnYesItalian = this.onReturnYesItalian.bind(this);
        this.voteCountUpdateItalian = this.voteCountUpdateItalian.bind(this);
        this.collector = this.collector.bind(this)
        this.onReturnCollector = this.onReturnCollector.bind(this)
        this.voteCountUpdateCollector = this.voteCountUpdateCollector.bind(this)
    }
    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connected', this.connected)
        this.socket.on('welcome', this.updateState)
        this.socket.on('onChinese', this.onChinese);
        this.socket.on('onReturnYesChinese', this.onReturnYesChinese);
        this.socket.on('voteCountUpdateChinese', this.voteCountUpdateChinese);
        this.socket.on('onJapanese', this.onJapanese);
        this.socket.on('onReturnYesJapanese', this.onReturnYesJapanese);
        this.socket.on('voteCountUpdateJapanese', this.voteCountUpdateJapanese);
        this.socket.on('onMexican', this.onMexican);
        this.socket.on('onReturnYesMexican', this.onReturnYesMexican);
        this.socket.on('voteCountUpdateMexican', this.voteCountUpdateMexican);
        this.socket.on('onItalian', this.onItalian);
        this.socket.on('onReturnYesItalian', this.onReturnYesItalian);
        this.socket.on('voteCountUpdateItalian', this.voteCountUpdateItalian);
        this.socket.on('collector', this.collector);
        this.socket.on('onReturnCollector', this.onReturnCollector);
        this.socket.on('voteCountUpdateCollector', this.voteCountUpdateCollector);
    }
    emit(event, data) {
        this.socket.emit(event, data);
    }
    updateState(serverState) {
        this.setState(serverState);
    }
    connected(data) {
        this.setState({ name: data.name });
    }
    onChinese() {
        this.emit('yesChinese');
    }
    onReturnYesChinese(data) {
        this.setState({ count4Chinese: data.count4Chinese }) 
    }
    voteCountUpdateChinese(data) {
        this.setState({ count4Chinese: data.count4Chinese })
    }
    onJapanese() {
        this.emit('yesJapanese');
    }
    onReturnYesJapanese(data) {
        this.setState({ count4Japanese: data.count4Japanese })
    }
    voteCountUpdateJapanese(data) {
        this.setState({ count4Japanese: data.count4Japanese })
    }
    onMexican() {
        this.emit('yesMexican');
    }
    onReturnYesMexican(data) {
        this.setState({ count4Mexican: data.count4Mexican })
    }
    voteCountUpdateMexican(data) {
        this.setState({ count4Mexican: data.count4Mexican })
    }
    onItalian() {
        this.emit('yesItalian');
    }
    onReturnYesItalian(data) {
        this.setState({ count4Italian: data.count4Italian })
    }
    voteCountUpdateItalian(data) {
        this.setState({ count4Italian: data.count4Italian })
    }
    collector() {
        this.emit('yesCollection');
    }
    onReturnCollector(data) {
        console.log(data.winner, ' this is that data on ONRETURNCOLLECTOR')
        this.setState({ winner: data.winner }) 
    }
    voteCountUpdateCollector(data) {
        console.log('votecountupdatecollectorhit', data.winner)
        this.setState({ winner: data.winner })
    }



    render() {
        console.log(this.state.winner, ' this is this state.winner')
        return (
        <div>
                <div className="cover-container" style={styles.contain}>

                    <div className="col-lg-6">
                        <h1 className="cover-heading">Here’s four choices.</h1>


                                <RadioButtonGroup name="foodTypes" defaultSelected="not_light">

                                    <RadioButton
                                        value="Mexican"
                                        label="Mexican Cuisine"
                                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                        uncheckedIcon={<ActionFavoriteBorder />}
                                        style={styles.radioButton}
                                        onClick={this.onMexican}
                                    />

                                    <RadioButton
                                        value="Japanese"
                                        label="Japanese Cuisine"
                                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                        uncheckedIcon={<ActionFavoriteBorder />}
                                        style={styles.radioButton}
                                        onClick={this.onJapanese}
                                    />

                                    <RadioButton
                                        value="Italian"
                                        label="Italian Cuisine"
                                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                        uncheckedIcon={<ActionFavoriteBorder />}
                                        style={styles.radioButton}
                                        onClick={this.onItalian}
                                    />

                                    <RadioButton
                                        value="Chinese"
                                        label="Chinese Cuisine"
                                        checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                                        uncheckedIcon={<ActionFavoriteBorder />}
                                        style={styles.radioButton}
                                        onClick={this.onChinese}
                                    />
                                    <RadioButton
                                        value="collection"
                                        label="Choose Meal"
                                        onClick={this.collector}
                                    />
                                </RadioButtonGroup>
                        </div>

                <div className="col-lg-6">
                    <h1 className="cover-heading">Results</h1>
                    <p className="lead">{this.state.count4Mexican} Votes for Mexican Cuisine </p>
                    <p className="lead">{this.state.count4Japanese} Votes for Japanese Cuisine </p>
                    <p className="lead">{this.state.count4Chinese} Votes for Chinese Cuisine </p>
                    <p className="lead">{this.state.count4Italian} Votes for Italian Cuisine</p>
                    <p className="won">{this.state.winner}!!</p>
                </div>
            </div>
            <div className="winnerImage">{this.state.image}</div>
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
    contain: {
        wrapMargin: '30',
        padding: '50',
    }
};

export default Platform;
