import React from 'react';
import '../styles/ChattingRow.css';

class ChattingRow extends React.Component {
    get date() {
        const date = new Date(this.props.log.time);
        const hour = `${date.getHours() < 10 ? 0 : ''}${date.getHours()}`;
        const minutes = `${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
        const seconds = `${date.getSeconds() < 10 ? 0 : ''}${date.getSeconds()}`;

        return `${hour}:${minutes}:${seconds}`;
    }

    render() {
        const { log } = this.props;
        return (
            <div className="ChattingRow">
                <div className="time_stamp">[{this.date}]</div>
                [<div className="user">{log.name}</div>]
                <div className="chat_text">{log.text}</div>
            </div>
        );
    }
}

export default ChattingRow;