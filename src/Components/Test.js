import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'disconnected',
            Option1: 'Chinese',
            Option2: 'Japanese',
            Option3: 'Mexican',
            Option4: 'Italian',
            count4Chinese: 0,
            count4Japanese: 0,
            count4Mexican: 0,
            count4Italian: 0,
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
    render() {
        return (
            <div>
                <h1>{this.state.Option1}, {this.state.count4Chinese}</h1>
                <h1>{this.state.Option2}, {this.state.count4Japanese}</h1>
                <h1>{this.state.Option3}, {this.state.count4Mexican}</h1>
                <h1>{this.state.Option4}, {this.state.count4Italian}</h1>
                <button type="button" onClick={this.onChinese}>Chinese</button>
                <button type="button" onClick={this.onJapanese}>Japanese</button>
                <button type="button" onClick={this.onMexican}>Mexican</button>
                <button type="button" onClick={this.onItalian}>Italian</button>
            </div>
        );
    }
}
export default Test;