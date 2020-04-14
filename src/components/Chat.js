import React from 'react';
import '../styles/Chat.css';
import ChattingRow from './ChattingRow';
import SocketIO from 'socket.io-client';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            currentUser: 0,
            chatLogs: [],
            text: ''
        };
        this.socket = null;
        this.scrollElement = React.createRef();
    }

    componentDidMount() {
        const socket = SocketIO('https://www.currency-trends.com/');
        socket.on('message', this.message.bind(this));
        socket.on('initialize', this.initialize.bind(this));
        socket.on('currentUser', this.setCurrentUser.bind(this));
        this.socket = socket;
    }

    setCurrentUser(length) {
        const currentUser = length;
        this.setState({ currentUser });
    }

    message(messageData) {
        const chatLogs = this.state.chatLogs;
        chatLogs.push(messageData);
        this.setState({ chatLogs });
        this.scrollElement.current.scrollIntoView({ behavior: "smooth" });
    }

    initialize(id) {
        this.setState({ id });
    }

    get chattingRows() {
        return this.state.chatLogs.map((log, index) => {
            return <ChattingRow log={log} key={index} />;
        });
    }

    keydown = (event) => {
        if (event.keyCode === 13) {
            if (this.state.text.length) {
                this.socket.emit('message', this.state.text);
            }
            const text = '';
            this.setState({ text });
        }
    }

    onChange = (event) => {
        const text = event.target.value;
        this.setState({ text });
    }

    render() {
        const { currentUser, id, text } = this.state;
        return (
            <div className="Chat">
                <div className="chatting_user">
                    [ Current {currentUser} users in here ]
                </div>
                <div className="chatting_display">
                    {this.chattingRows}
                    <div ref={this.scrollElement}></div>
                </div>
                <div className="chatting_bar">
                    <div className="nick_name">User {id}</div>
                    <input className="chatting_input" type="text" placeholder="insert yout chat" value={text} onKeyDown={this.keydown} onChange={this.onChange}></input>
                </div>
            </div>
        );
    }
}

export default Chat;