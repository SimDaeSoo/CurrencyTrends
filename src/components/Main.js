import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Network from '../utils/Network';
import '../styles/Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            codes: []
        };
    }

    componentDidMount() {
        this.fetchCurrencyData();
    }

    async fetchCurrencyData() {
        const result = await Network.get('http://13.209.124.232:8000/api/currency');
        const { currencies } = result;
        this.setChartData(currencies);
    }

    setChartData(currencies) {
        const codes = [];
        const chartDataDictionary = {};
        for (const currencyData of currencies) {
            const { code, date, rate } = currencyData;
            const label = date.match(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g)[0];

            if (codes.indexOf(code) < 0) codes.push(code);
            if (!chartDataDictionary[label]) chartDataDictionary[label] = { name: label };
            chartDataDictionary[label][code] = rate;
        }

        const datas = [];
        for (const key in chartDataDictionary) {
            datas.push(chartDataDictionary[key]);
        }

        this.setState({ datas, codes });
    }

    get charts() {
        const elements = [];
        for (const code of this.state.codes) {
            elements.push(
                <div className="chart_wrapper">
                    <ResponsiveContainer width='100%' height={200} className='chart_container' key={code} id={code}>
                        <LineChart data={this.state.datas} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="name" hide={true} />
                            <YAxis domain={[dataMin => dataMin, dataMax => dataMax]} hide={true} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', border: 'none' }} itemStyle={{ color: 'white' }}/>
                            <Legend verticalAlign='top' height={30} />
                            <Line type="monotone" dataKey={code} stroke={this.randomColor} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            );
        }
        return elements;
    }

    get randomColor() {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        return `#${r < 16 ? '0' : ''}${r.toString(16)}${g < 16 ? '0' : ''}${g.toString(16)}${b < 16 ? '0' : ''}${b.toString(16)}`;
    }

    render() {
        return (
            <div className="Main">
                <div className="header">Currency Trends</div>
                {this.charts}
            </div>
        );
    }
}

export default Main;