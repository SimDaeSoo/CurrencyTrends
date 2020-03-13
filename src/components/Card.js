import React from 'react';
import '../styles/Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    get title() {
        return <div dangerouslySetInnerHTML={{ __html: this.props.title }} />;
    }

    get author() {
        return <div dangerouslySetInnerHTML={{ __html: this.props.author }} />;
    }

    get date() {
        return <div dangerouslySetInnerHTML={{ __html: this.props.date }} />;
    }

    linking = () => {
        if (this.props.link) window.open(this.props.link)
    }

    render() {
        return (
            <div className="card" onClick={this.linking}>
                <div className="title">{this.title}</div>
                <div className="author">{this.author}</div>
                <div className="date">{this.date}</div>
            </div>
        );
    }
}

export default Card;