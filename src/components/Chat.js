import React from 'react';
import '../styles/Chat.css';
import ChattingRow from './ChattingRow';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 0,
            chatLogs: [{ name: 'user', text: 'test', time: Date.now() }]
        };
    }

    get chattingRows() {
        return this.state.chatLogs.map((log, index) => {
            return <ChattingRow log={log} key={index} />;
        });
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className="Chat">
                <div className="chatting_user">
                    [ Current {currentUser} users in here ]
                </div>
                <div className="chatting_display">
                    {this.chattingRows}
                </div>
                <div className="chatting_bar">
                    <div className="nick_name">User</div>
                    <input className="chatting_input" type="text" placeholder="insert yout chat"></input>
                </div>
            </div>
        );
    }
}

export default Chat;