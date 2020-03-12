import React from 'react';
import Network from '../utils/Network';
import Card from './Card';
import '../styles/News.css';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
    }

    componentDidMount() {
        this.fetchCurrencyData();
    }

    async fetchCurrencyData() {
        const result = await Network.get('http://13.209.124.232:8000/api/news');
        const { news } = result;
        this.setState({ news });
    }

    get newsElements() {
        return this.state.news.map((news) => {
            return <Card title={news.title} author={news.author} date={news.date} key={news.title} />;
        });
    }

    render() {
        return (
            <div className="News">
                <div className="card_list">
                    {this.newsElements}
                </div>
            </div>
        );
    }
}

export default News;