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
        const result = await Network.get('https://www.currency-trends.com/api/news');
        const { news } = result;
        news.sort((compareA, compareB) => {
            const timeA = new Date(compareA.date).getTime();
            const timeB = new Date(compareB.date).getTime();
            if (timeA < timeB) {
                return 1;
            } else if (timeA > timeB) {
                return -1;
            } else {
                return 0;
            }
        });
        this.setState({ news });
    }

    get newsElements() {
        return this.state.news.map((news) => {
            return <Card title={news.title} author={news.author} date={news.date} key={news.title} link={news.link} />;
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